export const GLOBAL_INIT = 'GLOBAL_INIT'
export const REDUCE_CHANCE = 'REDUCE_CHANCE'
export const SAVE_RESULT = 'SAVE_RESULT'
export const ACTIVE_LEVEL = 'ACTIVE_LEVEL'

const globalInit = level => ({
  level,
  type: GLOBAL_INIT
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
  globalInit,
  reduceChance,
  saveResult,
  activeLevel
}
