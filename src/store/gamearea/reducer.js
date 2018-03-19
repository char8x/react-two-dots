import {
  INIT_GAME,
  SHOW_BOARD,
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  BEFORE_PANNING_END,
  PANNING_END,
  PANNING,
  RESET_DOT_STATE,
  REFRESH_BOARD
} from './actions';
import {
  isAdjacent,
  isSameDot,
  lineDeg,
  removeDots,
  rectangleExist,
  addNewDots
} from '../../utils/board';
import { DOT_TYPE_DOT } from '../../utils/constants';
import clone from '../../utils/clone';
import initLevels from '../../models/levels';

const resetProp = {
  panningDot: null,
  panDirection: null,
  dotColor: '',
  rectangle: false,
  linePosition: {
    x: 0,
    y: 0
  },
  connectedDots: [],
  connectedLines: [],
  bounceStartDots: [] // col start bounce dot
};

const initState = {
  ...resetProp,
  showBoard: false,
  level: 0,
  goals: [],
  array: [],
  boardHeight: 0,
  boardWidth: 0,
  chances: 0,
  clearDots: 0,
  score: 0,
  showStart: true,
  showSuccess: false,
  showFailure: false
};

export default (state = initState, action) => {
  const {
    array,
    boardHeight,
    connectedDots,
    connectedLines,
    panningDot,
    linePosition,
    bounceStartDots,
    chances,
    clearDots,
    goals,
    rectangle,
    dotColor
  } = state;
  switch (action.type) {
    case INIT_GAME:
      const data = initLevels[action.level - 1].data();
      return {
        ...state,
        array: data.array,
        boardHeight: data.height,
        boardWidth: Math.floor(data.array.length / data.height),
        level: action.level,
        chances: data.chance,
        goals: data.goals,
        clearDots: 0,
        score: 0,
        showBoard: false,
        showStart: true,
        showSuccess: false,
        showFailure: false
      };
    case SHOW_BOARD:
      return {
        ...state,
        showStart: false,
        showBoard: true
      };
    case PANNING_START:
      const newConnectedDots = clone(connectedDots);
      newConnectedDots.push(action.dot);
      return {
        ...state,
        connectedDots: newConnectedDots,
        panningDot: action.dot,
        linePosition: action.position
      };
    case PANNING:
      return {
        ...state,
        panDirection: action.direction
      };
    case ENTER_DOT:
      // if dot is slibing dot with panningDot
      const { adjacent, direction } = isAdjacent(array, boardHeight)(
        panningDot,
        action.dot
      );
      const color = array[panningDot].color;

      if (adjacent) {
        if (
          connectedDots.length >= 2 &&
          isSameDot(connectedDots[connectedDots.length - 2], action.dot)
        ) {
          // the dot already connected
          const clonedConnectedDots = clone(connectedDots);
          const clonedConnectedLines = clone(connectedLines);
          clonedConnectedDots.pop();
          const lastLine = clonedConnectedLines.pop();
          if (lastLine == null) return state;
          return {
            ...state,
            rectangle: false,
            connectedDots: clonedConnectedDots,
            connectedLines: clonedConnectedLines,
            panningDot: clonedConnectedDots[clonedConnectedDots.length - 1],
            linePosition: { x: lastLine.x, y: lastLine.y }
          };
        } else {
          // add new dot
          const newConnectedDots = clone(connectedDots);
          const newConnectedLines = clone(connectedLines);
          newConnectedDots.push(action.dot);
          newConnectedLines.push({
            direction,
            deg: lineDeg[direction],
            color: color,
            ...linePosition
          });

          if (rectangleExist(newConnectedDots)) {
            const newArray = clone(array);
            newArray.forEach(d => {
              if (d.color === color && d.type === DOT_TYPE_DOT) {
                d.isActive = true;
              }
            });
            return {
              ...state,
              rectangle: true,
              dotColor: color,
              array: newArray,
              connectedDots: newConnectedDots,
              connectedLines: newConnectedLines,
              panningDot: action.dot,
              linePosition: action.position
            };
          }
          return {
            ...state,
            rectangle: false,
            dotColor: color,
            connectedDots: newConnectedDots,
            connectedLines: newConnectedLines,
            panningDot: action.dot,
            linePosition: action.position
          };
        }
      }

      return state;
    case LEAVE_DOT:
      const clonedConnectedDots = clone(connectedDots);
      const clonedConnectedLines = clone(connectedLines);
      clonedConnectedDots.pop();
      const lastLine = clonedConnectedLines.pop();

      return {
        ...state,
        rectangle: false,
        connectedDots: clonedConnectedDots,
        connectedLines: clonedConnectedLines,
        panningDot: clonedConnectedDots[clonedConnectedDots.length - 1],
        linePosition: { x: lastLine.x, y: lastLine.y }
      };
    case BEFORE_PANNING_END:
      if (connectedDots.length > 1) {
        const newArray = clone(array);
        if (rectangle) {
          const color = array[connectedDots[0]].color;
          newArray.forEach(dot => {
            if (dot.color === color && dot.type === DOT_TYPE_DOT) {
              dot.isClear = true;
            }
          });
        } else {
          connectedDots.forEach(d => (newArray[d].isClear = true));
        }
        return {
          ...state,
          connectedLines: [],
          array: newArray
        };
      }
      return {
        ...state,
        ...resetProp
      };
    case PANNING_END:
      if (connectedDots.length > 1) {
        const newArray = clone(array);
        const { startDots, removedDotsCount, color } = removeDots(
          newArray,
          boardHeight
        )(connectedDots);
        let newGoals = clone(goals);
        for (let i = 0; i < newGoals.length; i++) {
          if (newGoals[i].color === color) {
            newGoals[i].clear += removedDotsCount;
          }
        }

        return {
          ...state,
          ...resetProp,
          dotColor, // keep for REFRESH_BOARD
          rectangle, // keep for REFRESH_BOARD
          bounceStartDots: startDots,
          array: newArray,
          chances: chances - 1,
          clearDots: clearDots + removedDotsCount,
          goals: newGoals
        };
      }
      return {
        ...state,
        ...resetProp
      };
    case REFRESH_BOARD:
      const tempArray = clone(array);
      addNewDots(tempArray, boardHeight, rectangle && dotColor);
      // update bounce effect
      bounceStartDots.forEach(d => {
        for (
          let i = d;
          i < (Math.floor(d / boardHeight) + 1) * boardHeight;
          i++
        ) {
          tempArray[i].isBounce = true;
        }
      });

      // fulfill goals
      if (goals.every(g => g.clear >= g.goal)) {
        // Game succeed
        return {
          ...state,
          ...resetProp,
          array: tempArray,
          score: clearDots + chances * 100,
          showSuccess: true
        };
      }

      // out of chances
      if (chances === 0) {
        return {
          ...state,
          ...resetProp,
          array: tempArray,
          showFailure: true
        };
      }

      return {
        ...state,
        ...resetProp,
        bounceStartDots,
        array: tempArray
      };
    case RESET_DOT_STATE:
      let newArray = null;
      if (action.property === 'isBounce' && bounceStartDots.length > 0) {
        newArray = clone(array);
        bounceStartDots.forEach(d => {
          for (
            let i = d;
            i < (Math.floor(d / boardHeight) + 1) * boardHeight;
            i++
          ) {
            newArray[i].isBounce = false;
          }
        });
        return {
          ...state,
          bounceStartDots: [],
          array: newArray
        };
      } else if (
        action.property === 'isActive' &&
        rectangle &&
        dotColor !== ''
      ) {
        newArray = clone(array);
        newArray.forEach(d => {
          if (d.color === dotColor && d.type === DOT_TYPE_DOT) {
            d.isActive = false;
          }
        });
        return {
          ...state,
          array: newArray
        };
      } else if (action.property === 'isClear' && connectedDots.length > 1) {
        newArray = clone(array);
        if (rectangle) {
          const color = array[connectedDots[0]].color;
          newArray.forEach(dot => {
            if (dot.color === color && dot.type === DOT_TYPE_DOT) {
              dot.isClear = false;
            }
          });
        } else {
          connectedDots.forEach(d => (newArray[d].isClear = false));
        }
        return {
          ...state,
          array: newArray
        };
      }
      return state;
    default:
      return state;
  }
};
