export const INIT_GAME = 'INIT_GAME'
export const REDUCE_CHANCE = 'REDUCE_CHANCE'
export const SAVE_RESULT = 'SAVE_RESULT'
export const ACTIVE_LEVEL = 'ACTIVE_LEVEL'

const initGame = level => ({
  level,
  type: INIT_GAME
})

const reduceChance = () => ({
  type: REDUCE_CHANCE
})

const saveResult = score => ({
  score,
  type: SAVE_RESULT
})

const activeLevel = level => ({
  level,
  type: ACTIVE_LEVEL
})

export default {
  initGame,
  reduceChance,
  saveResult,
  activeLevel
}
