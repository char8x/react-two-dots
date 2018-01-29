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
  connectingDots: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case PANNING_START:
      return {
        ...state,
        panningDot: action.dot
      }
    case PANNING:
      return {
        ...state,
        panDirection: action.direction
      }
    case ENTER_DOT:
      // if dot is slibing dot with panningDot
      if (isAdjacent(state.panningDot, action.dot)) {
        return {
          ...state,
          panDirection: action.direction,
          connectingDots: state.connectingDots.push(action.dot)
        }
      } else {
        return {
          ...state,
          panDirection: action.direction
        }
      }
    case LEAVE_DOT:
      if (isOppositeDirection(state.panDirection, action.direction)) {
        return {
          ...state,
          connectingDots: state.connectingDots.pop(),
          panningDot: state.connectingDots[state.connectingDots.length - 1]
        }
      } else {
        return {
          ...state,
          panningDot: state.connectingDots[state.connectingDots.length - 1]
        }
      }
    case PANNING_END:
      if (state.connectingDots.length > 1) {
        // clear connecting dots
        // add new dots,update matrix
        return {
          ...state,
          matrix
        }
      } else {
        return {
          ...state,
          panningDot: null,
          panDirection: null,
          connectingDots: []
        }
      }
    default:
      return state
  }
}
