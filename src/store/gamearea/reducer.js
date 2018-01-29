import {
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  PANNING_END,
  PANNING
} from './actions'
import {
  matrix,
  isAdjacent,
  isOppositeDirection,
  lineDeg
} from '../../utils/data'

const initState = {
  matrix,
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
  switch (action.type) {
    case PANNING_START:
      state.connectedDots.push(action.dot)
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
      if (isAdjacent(state.panningDot, action.dot)) {
        state.connectedDots.push(action.dot)
        state.connectedLines.push({
          deg: lineDeg[state.panDirection],
          ...state.linePosition
        })
        return {
          ...state,
          panningDot: action.dot,
          linePosition: action.position
        }
      }
      return state
    case LEAVE_DOT:
      if (isOppositeDirection(state.panDirection, action.direction)) {
        state.connectedDots.pop()
        state.connectedLines.pop()
      }
      return {
        ...state,
        panningDot: state.connectedDots[state.connectedDots.length - 1]
      }
    case PANNING_END:
      if (state.connectedDots.length > 1) {
        state.connectedDots = []
        // clear connecting dots
        // add new dots,update matrix
        return {
          ...state,
          matrix: state.matrix
        }
      } else {
        return {
          ...initState,
          connectedDots: [],
          matrix: state.matrix
        }
      }
    default:
      return state
  }
}
