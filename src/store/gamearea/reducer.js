import {
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  BEFORE_PANNING_END,
  PANNING_END,
  PANNING,
  RESET_DOT_STATE,
  REFRESH_MATRIX
} from './actions'
import {
  matrix2 as originalMatrix,
  isAdjacent,
  isOppositeDirection,
  lineDeg,
  removeDots,
  rectangleExist,
  addNewDots
} from '../../utils/data'
import {
  DOT_TYPE_DOT,
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW
} from '../../utils/constants'
import clone from '../../utils/clone'

const chance = 20
const level = 1
const dotGoals = [
  {
    color: COLOR_BLUE,
    clear: 0,
    goal: 15
  },
  {
    color: COLOR_PURPLE,
    clear: 0,
    goal: 15
  },
  {
    color: COLOR_RED,
    clear: 0,
    goal: 15
  },
  {
    color: COLOR_YELLOW,
    clear: 0,
    goal: 15
  }
]

const initState = {
  matrix: originalMatrix,
  colLength: 5,
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
  bounceStartDots: [], // col start bounce dot
  chances: chance,
  clearDots: 0,
  score: 0,
  level: level,
  goals: dotGoals
}

export default (state = initState, action) => {
  const {
    matrix,
    colLength,
    connectedDots,
    connectedLines,
    panningDot,
    panDirection,
    linePosition,
    bounceStartDots,
    chances,
    clearDots,
    score,
    goals
  } = state
  switch (action.type) {
    case PANNING_START:
      const newConnectedDots = clone(connectedDots)
      newConnectedDots.push(action.dot)
      return {
        ...state,
        connectedDots: newConnectedDots,
        panningDot: action.dot,
        linePosition: action.position
      }
    case PANNING:
      return {
        ...state,
        panDirection: action.direction
      }
    case ENTER_DOT:
      // if dot is slibing dot with panningDot
      const { adjacent, direction } = isAdjacent(matrix)(panningDot, action.dot)
      const color = matrix[panningDot.col][panningDot.row].color
      if (adjacent) {
        const newConnectedDots = clone(connectedDots)
        const newConnectedLines = clone(connectedLines)
        newConnectedDots.push(action.dot)
        newConnectedLines.push({
          deg: lineDeg[direction],
          color: color,
          ...linePosition
        })

        if (rectangleExist(newConnectedDots)) {
          const newMatrix = clone(matrix)
          newMatrix.forEach((col, i) => {
            col.forEach(d => {
              if (d.color === color && d.type === DOT_TYPE_DOT) {
                d.isActive = true
              }
            })
          })
          return {
            ...state,
            rectangle: true,
            dotColor: color,
            matrix: newMatrix,
            connectedDots: newConnectedDots,
            connectedLines: newConnectedLines,
            panningDot: action.dot,
            linePosition: action.position
          }
        }
        return {
          ...state,
          rectangle: false,
          dotColor: color,
          connectedDots: newConnectedDots,
          connectedLines: newConnectedLines,
          panningDot: action.dot,
          linePosition: action.position
        }
      }
      return state
    case LEAVE_DOT:
      if (isOppositeDirection(panDirection, action.direction)) {
        const newConnectedDots = clone(connectedDots)
        const newConnectedLines = clone(connectedLines)
        newConnectedDots.pop()
        newConnectedLines.pop()

        return {
          ...state,
          connectedDots: newConnectedDots,
          connectedLines: newConnectedLines,
          panningDot: connectedDots[connectedDots.length - 1]
        }
      } else {
        return state
      }
    case BEFORE_PANNING_END:
      if (connectedDots.length > 1) {
        const newMatrix = clone(matrix)
        if (rectangleExist(connectedDots)) {
          const color = matrix[connectedDots[0].col][connectedDots[0].row].color
          newMatrix.forEach(col => {
            col.forEach(row => {
              if (row.color === color && row.type === DOT_TYPE_DOT) {
                row.isClear = true
              }
            })
          })
        } else {
          connectedDots.forEach(d => (newMatrix[d.col][d.row].isClear = true))
        }
        return {
          ...state,
          connectedLines: [],
          matrix: newMatrix
        }
      }
      return {
        ...initState,
        matrix,
        chances,
        clearDots,
        goals,
        score
      }
    case PANNING_END:
      if (connectedDots.length > 1) {
        const newMatrix = clone(matrix)
        const { bounceStartDots, removedDotsCount, color } = removeDots(
          newMatrix
        )(connectedDots)
        let newGoals = clone(goals)
        for (let i = 0; i < newGoals.length; i++) {
          if (newGoals[i].color === color) {
            newGoals[i].clear += removedDotsCount
          }
        }

        return {
          ...initState,
          bounceStartDots,
          matrix: newMatrix,
          chances: chances - 1,
          clearDots: clearDots + removedDotsCount,
          goals: newGoals,
          score
        }
      }
      return {
        ...initState,
        matrix,
        chances,
        clearDots,
        goals,
        score
      }
    case REFRESH_MATRIX:
      const tempMatrix = clone(matrix)
      addNewDots(tempMatrix, colLength)
      // TODO: update bounce effect
      // bounceStartDots.forEach(d => {
      //   for (let i = d.row; i < tempMatrix[d.col].length; i++) {
      //     tempMatrix[d.col][i].isBounce = true
      //   }
      // })
      return {
        ...state,
        bounceStartDots: [],
        matrix: tempMatrix
      }
    case RESET_DOT_STATE:
      const newMatrix = clone(matrix)
      newMatrix[action.dot.col][action.dot.row].isActive = false
      return {
        ...state,
        matrix: newMatrix
      }
    default:
      return state
  }
}
