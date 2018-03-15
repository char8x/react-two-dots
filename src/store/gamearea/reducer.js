import {
  INIT_GAME,
  SHOW_MATRIX,
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  BEFORE_PANNING_END,
  PANNING_END,
  PANNING,
  RESET_DOT_STATE,
  REFRESH_MATRIX,
  RESTART_GAME
} from './actions'
import {
  isAdjacent,
  lineDeg,
  removeDots,
  rectangleExist,
  addNewDots
} from '../../utils/matrix'
import { DOT_TYPE_DOT } from '../../utils/constants'
import clone from '../../utils/clone'

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
}

const initState = {
  ...resetProp,
  showMatrix: false,
  level: 0,
  goals: [],
  matrix: [[]],
  colLength: 0,
  chances: 0,
  clearDots: 0,
  score: 0,
  showSuccess: false,
  showFailure: false
}

export default (state = initState, action) => {
  const {
    level,
    matrix,
    colLength,
    connectedDots,
    connectedLines,
    panningDot,
    linePosition,
    bounceStartDots,
    chances,
    clearDots,
    score,
    goals,
    rectangle,
    dotColor
  } = state
  switch (action.type) {
    case INIT_GAME:
      return {
        ...state,
        matrix: action.matrix,
        colLength: action.matrix[0].length,
        level: action.level,
        chances: action.chance,
        goals: action.goals
      }
    case SHOW_MATRIX:
      return {
        ...state,
        showMatrix: true
      }
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
          direction,
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
      const clonedConnectedDots = clone(connectedDots)
      const clonedConnectedLines = clone(connectedLines)
      clonedConnectedDots.pop()
      const lastLine = clonedConnectedLines.pop()

      return {
        ...state,
        rectangle: false,
        connectedDots: clonedConnectedDots,
        connectedLines: clonedConnectedLines,
        panningDot: clonedConnectedDots[clonedConnectedDots.length - 1],
        linePosition: { x: lastLine.x, y: lastLine.y }
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
        ...state,
        ...resetProp
      }
    case PANNING_END:
      if (connectedDots.length > 1) {
        const newMatrix = clone(matrix)
        const { startDots, removedDotsCount, color } = removeDots(newMatrix)(
          connectedDots
        )
        let newGoals = clone(goals)
        for (let i = 0; i < newGoals.length; i++) {
          if (newGoals[i].color === color) {
            newGoals[i].clear += removedDotsCount
          }
        }

        return {
          ...state,
          ...resetProp,
          dotColor, // keep for REFRESH_MATRIX
          rectangle, // keep for REFRESH_MATRIX
          bounceStartDots: startDots,
          matrix: newMatrix,
          chances: chances - 1,
          clearDots: clearDots + removedDotsCount,
          goals: newGoals
        }
      }
      return {
        ...state,
        ...resetProp
      }
    case REFRESH_MATRIX:
      const tempMatrix = clone(matrix)
      // update bounce effect
      bounceStartDots.forEach(d => {
        for (let i = d.row; i < tempMatrix[d.col].length && i >= 0; i++) {
          tempMatrix[d.col][i].isBounce = true
        }
      })
      addNewDots(tempMatrix, colLength, level, rectangle && dotColor)
      if (goals.every(g => g.clear === g.goal)) {
        return {
          ...state,
          ...resetProp,
          matrix: tempMatrix,
          showSuccess: true
        }
      }
      return {
        ...state,
        ...resetProp,
        matrix: tempMatrix
      }
    case RESET_DOT_STATE:
      const newMatrix = clone(matrix)
      newMatrix[action.dot.col][action.dot.row][action.property] = false
      return {
        ...state,
        matrix: newMatrix
      }
    case RESTART_GAME:
      return {}
    default:
      return state
  }
}
