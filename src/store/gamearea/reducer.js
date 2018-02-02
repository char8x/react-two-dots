import {
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  PANNING_END,
  PANNING,
  RESET_DOT_STATE
} from './actions'
import {
  originalMatrix,
  isAdjacent,
  isOppositeDirection,
  lineDeg,
  removeDots
} from '../../utils/data'

const initState = {
  matrix: originalMatrix,
  panningDot: null,
  panDirection: null,
  linePosition: {
    x: 0,
    y: 0
  },
  connectedDots: [],
  connectedLines: []
}

export default (state = initState, action) => {
  const {
    matrix,
    connectedDots,
    connectedLines,
    panningDot,
    panDirection,
    linePosition
  } = state
  switch (action.type) {
    case PANNING_START:
      connectedDots.push(action.dot)
      return {
        ...state,
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
      if (isAdjacent(matrix)(panningDot, action.dot)) {
        connectedDots.push(action.dot)
        connectedLines.push({
          deg: lineDeg[panDirection],
          color: matrix[panningDot.col][panningDot.row].color,
          ...linePosition
        })
        matrix[panningDot.col][panningDot.row].isActive = true
        return {
          ...state,
          panningDot: action.dot,
          linePosition: action.position
        }
      }
      return state
    case LEAVE_DOT:
      if (isOppositeDirection(panDirection, action.direction)) {
        connectedDots.pop()
        connectedLines.pop()
      }
      return {
        ...state,
        panningDot: connectedDots[connectedDots.length - 1]
      }
    case PANNING_END:
      if (connectedDots.length > 1) {
        removeDots(matrix)(connectedDots)
        return {
          ...initState,
          matrix
        }
      } else {
        return initState
      }
    case RESET_DOT_STATE:
      matrix[action.dot.col][action.dot.row].isActive = false
      return state
    default:
      return state
  }
}
