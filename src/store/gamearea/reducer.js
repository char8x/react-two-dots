import {
  INIT_GAME,
  SHOW_BOARD,
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  BEFORE_PANNING_END,
  PANNING_END,
  RESET_DOT_STATE,
  REFRESH_BOARD
} from './actions';
import {
  removeDots,
  addNewDots,
  existAdjacentDot,
  shuffleArray
} from '../../models/board';
import { DOT_TYPE_DOT } from '../../utils/constants';
import clone from '../../utils/clone';
import initLevels from '../../models/levels';

const resetProp = {
  dotColor: '',
  rectangle: false,
  bounceStartDots: [] // col start bounce dot (temp variable)
};

const initState = {
  ...resetProp,
  showBoard: false,
  level: 0,
  goals: [],
  array: [],
  boardHeight: 0,
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
      return {
        ...state,
        dotColor: action.dotColor
      };
    case ENTER_DOT: {
      const newArray = clone(array);
      if (action.rectangle) {
        newArray.forEach(d => {
          if (d.color === dotColor && d.type === DOT_TYPE_DOT) {
            d.active = true;
          }
        });
      } else {
        newArray[action.dot].active = true;
      }

      return {
        ...state,
        rectangle: action.rectangle,
        array: newArray
      };
    }
    case LEAVE_DOT: {
      return {
        ...state,
        rectangle: false
      };
    }
    case BEFORE_PANNING_END: {
      const dots = action.connectedDots;
      if (dots.length > 1) {
        const newArray = clone(array);
        if (rectangle) {
          newArray.forEach(dot => {
            if (dot.color === dotColor && dot.type === DOT_TYPE_DOT) {
              dot.clear = true;
            }
          });
        } else {
          dots.forEach(d => (newArray[d].clear = true));
        }
        return {
          ...state,
          array: newArray
        };
      }
      return {
        ...state,
        ...resetProp
      };
    }
    case PANNING_END:
      // TODO:
      if (action.connectedDots.length > 1) {
        const newArray = clone(array);
        const { startDots, removedDotsCount } = removeDots(
          newArray,
          boardHeight
        )(action.connectedDots);
        let newGoals = clone(goals);
        for (let i = 0; i < newGoals.length; i++) {
          if (newGoals[i].color === dotColor) {
            newGoals[i].clear += removedDotsCount;
          }
        }

        return {
          ...state,
          ...resetProp,
          dotColor, // keep for REFRESH_BOARD
          rectangle, // keep for REFRESH_BOARD
          bounceStartDots: startDots, // keep for REFRESH_BOARD
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
    case REFRESH_BOARD: {
      // TODO:
      const newArray = clone(array);
      addNewDots(newArray, boardHeight, rectangle && dotColor);
      // update bounce effect
      bounceStartDots.forEach(d => {
        for (
          let i = d;
          i < (Math.floor(d / boardHeight) + 1) * boardHeight;
          i++
        ) {
          newArray[i].bounce = true;
        }
      });
      // shuffle array the easy way
      if (!existAdjacentDot(newArray)) {
        shuffleArray(newArray);
      }

      // fulfill goals
      if (goals.every(g => g.clear >= g.goal)) {
        // Game succeed
        return {
          ...state,
          ...resetProp,
          array: newArray,
          score: clearDots + chances * 100,
          showSuccess: true
        };
      }

      // out of chances
      if (chances === 0) {
        return {
          ...state,
          ...resetProp,
          array: newArray,
          showFailure: true
        };
      }

      return {
        ...state,
        ...resetProp,
        bounceStartDots,
        array: newArray
      };
    }
    case RESET_DOT_STATE: {
      const newArray = clone(array);
      // TODO:
      if (action.property === 'bounce' && bounceStartDots.length > 0) {
        bounceStartDots.forEach(d => {
          for (
            let i = d;
            i < (Math.floor(d / boardHeight) + 1) * boardHeight;
            i++
          ) {
            newArray[i].bounce = false;
          }
        });
        return {
          ...state,
          bounceStartDots: [],
          array: newArray
        };
      } else if (action.property === 'active' && dotColor !== '') {
        newArray.forEach(d => {
          if (d.color === dotColor && d.type === DOT_TYPE_DOT) {
            d.active = false;
          }
        });
        return {
          ...state,
          array: newArray
        };
      } else if (
        action.property === 'clear' &&
        action.connectedDots.length > 1
      ) {
        if (rectangle) {
          newArray.forEach(dot => {
            if (dot.color === dotColor && dot.type === DOT_TYPE_DOT) {
              dot.clear = false;
            }
          });
        } else {
          action.connectedDots.forEach(d => (newArray[d].clear = false));
        }
        return {
          ...state,
          array: newArray
        };
      }
      return state;
    }
    default:
      return state;
  }
};
