export const PANNING_START = 'PANNING_START'
export const PANNING = 'PANNING'
export const PANNING_END = 'PANNING_END'
export const ENTER_DOT = 'ENTER_DOT'
export const LEAVE_DOT = 'LEAVE_DOT'
export const RESET_DOT_STATE = 'RESET_DOT_STATE'

const panningStart = (dot, position) => ({
  dot,
  position,
  type: PANNING_START
})

const panning = direction => ({
  direction,
  type: PANNING
})

const panningEnd = () => ({
  type: PANNING_END
})

const enterDot = (dot, position) => ({
  dot,
  position,
  type: ENTER_DOT
})

const leaveDot = dot => ({
  dot,
  type: LEAVE_DOT
})

const resetDotState = dot => ({
  dot,
  type: RESET_DOT_STATE
})

export default {
  panningStart,
  panning,
  panningEnd,
  enterDot,
  leaveDot,
  resetDotState
}
