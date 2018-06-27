import {
  GLOBAL_INIT,
  SAVE_RESULT,
  REDUCE_CHANCE,
  ACTIVE_LEVEL,
  RESET_GAME,
  TOGGLE_SETTING,
  TOGGLE_AUDIO_EFFECT,
  TOGGLE_MUSIC,
} from './actions';

import initLevels, { maxLevel } from '../../models/levels';
import clone from '../../utils/clone';

const initState = {
  maxLevel,
  showSetting: false,
  music: true,
  audioEffect: true,
  currentLevel: null,
  levels: initLevels.map(l => ({
    level: l.level,
    score: l.score,
    active: l.active,
  })),
  chance: 5,
};

export default (state = initState, action) => {
  const {
    levels,
    currentLevel,
    chance,
    showSetting,
    music,
    audioEffect,
  } = state;
  switch (action.type) {
    case GLOBAL_INIT:
      return {
        ...state,
        currentLevel: levels[action.level - 1],
      };
    case ACTIVE_LEVEL: {
      const cloneLevels = clone(levels);
      cloneLevels[action.level - 1].active = true;
      return {
        ...state,
        levels: cloneLevels,
        currentLevel: cloneLevels[action.level - 1],
      };
    }
    case REDUCE_CHANCE:
      return {
        ...state,
        chance: chance - 1,
      };
    case SAVE_RESULT: {
      const newLevels = clone(levels);
      newLevels[currentLevel.level - 1].score = action.score;
      return {
        ...state,
        levels: newLevels,
      };
    }
    case TOGGLE_SETTING: {
      return {
        ...state,
        showSetting: !showSetting,
      };
    }
    case RESET_GAME: {
      return {
        ...initState,
        music,
        audioEffect,
      };
    }
    case TOGGLE_MUSIC: {
      return {
        ...state,
        music: !music,
      };
    }
    case TOGGLE_AUDIO_EFFECT: {
      return {
        ...state,
        audioEffect: !audioEffect,
      };
    }
    default:
      return state;
  }
};
