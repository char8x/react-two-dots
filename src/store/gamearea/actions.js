export const PANNING_START = 'PANNING_START'
export const PANNING = 'PANNING'
export const PANNING_END = 'PANNING_END'
export const ENTER_DOT = 'ENTER_DOT'
export const LEAVE_DOT = 'LEAVE_DOT'

const panningStart = dot => ({
  dot,
  type: PANNING_START
})

const panning = direction => ({
  direction,
  type: PANNING
})

const panningEnd = () => ({
  type: PANNING_END
})

const enterDot = (dot, direction) => ({
  dot,
  direction,
  type: ENTER_DOT
})

const leaveDot = (dot, direction) => ({
  dot,
  direction,
  type: LEAVE_DOT
})

export default {
  panningStart,
  panning,
  panningEnd,
  enterDot,
  leaveDot
}
