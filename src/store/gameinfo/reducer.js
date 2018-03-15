import {
  GLOBAL_INIT,
  SAVE_RESULT,
  REDUCE_CHANCE,
  ACTIVE_LEVEL
} from './actions'

import initLevels, { maxLevel } from '../../models/levels'
import clone from '../../utils/clone'

const initState = {
  maxLevel,
  currentLevel: null,
  levels: initLevels,
  chance: 5
}

export default (state = initState, action) => {
  const { levels, currentLevel, chance } = state
  switch (action.type) {
    case GLOBAL_INIT:
      return {
        ...state,
        currentLevel: Object.assign(
          levels[action.level - 1],
          levels[action.level - 1].data()
        )
      }
    case ACTIVE_LEVEL:
      const cloneLevels = clone(levels)
      cloneLevels[action.level - 1].active = true
      return {
        ...state,
        levels: cloneLevels
      }
    case REDUCE_CHANCE:
      return {
        ...state,
        chance: chance - 1
      }
    case SAVE_RESULT:
      const newLevels = clone(levels)
      newLevels[currentLevel.level - 1].score = action.score
      return {
        ...state,
        levels: newLevels
      }
    default:
      return state
  }
}
