export const INIT_GAME = 'INIT_GAME';
export const SHOW_BOARD = 'SHOW_BOARD';
export const PANNING_START = 'PANNING_START';
export const PANNING = 'PANNING';
export const BEFORE_PANNING_END = 'BEFORE_PANNING_END';
export const PANNING_END = 'PANNING_END';
export const ENTER_DOT = 'ENTER_DOT';
export const LEAVE_DOT = 'LEAVE_DOT';
export const RESET_DOT_STATE = 'RESET_DOT_STATE';
export const REFRESH_BOARD = 'REFRESH_BOARD';

const initGame = level => ({
  level,
  type: INIT_GAME
});

const showBoard = () => ({
  type: SHOW_BOARD
});

const panningStart = dotColor => ({
  dotColor,
  type: PANNING_START
});

const panning = direction => ({
  direction,
  type: PANNING
});

const beforePanningEnd = () => ({
  type: BEFORE_PANNING_END
});

const panningEnd = () => ({
  type: PANNING_END
});

const enterDot = (dot, position) => ({
  dot,
  position,
  type: ENTER_DOT
});

const leaveDot = dot => ({
  dot,
  type: LEAVE_DOT
});

const resetDotState = property => ({
  property,
  type: RESET_DOT_STATE
});

const refreshBoard = () => ({
  type: REFRESH_BOARD
});

export default {
  initGame,
  showBoard,
  panningStart,
  panning,
  beforePanningEnd,
  panningEnd,
  enterDot,
  leaveDot,
  resetDotState,
  refreshBoard
};
