import {
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  PANNING_END,
  PANNING
} from './actions'
import { matrix, isAdjacent, isOppositeDirection } from '../../utils/data'

const initState = {
  matrix,
  panningDot: null,
  panDirection: null,
  linePosition: {
    x: 0,
    y: 0
  },
  connectingDots: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case PANNING_START:
      state.connectingDots.push(action.dot)
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
        state.connectingDots.push(action.dot)
        return {
          ...state,
          panningDot: action.dot
        }
      }
      return state
    case LEAVE_DOT:
      if (isOppositeDirection(state.panDirection, action.direction)) {
        state.connectingDots.pop()
      }
      return {
        ...state,
        panningDot: state.connectingDots[state.connectingDots.length - 1]
      }
    case PANNING_END:
      if (state.connectingDots.length > 1) {
        state.connectingDots = []
        // clear connecting dots
        // add new dots,update matrix
        return {
          ...state,
          matrix
        }
      } else {
        return {
          ...initState,
          matrix: state.matrix
        }
      }
    default:
      return state
  }
}
