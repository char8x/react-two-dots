import {
  COLOR_BLUE,
  COLOR_YELLOW,
  COLOR_RED,
  COLOR_PURPLE,
  COLOR_GREEN,
  DOT_TYPE_DOT
} from '../utils/constants';
import random from '../utils/random-index';

const allColors = [
  COLOR_BLUE,
  COLOR_YELLOW,
  COLOR_RED,
  COLOR_PURPLE,
  COLOR_GREEN
];

/**
 * Generate new dots
 *
 * Defferent level have different dot generation method,
 * how to generate dots is the key of this game
 *
 * possible variable:
 *  num,
 *  colors,
 *  dotTypes,
 *  column odd or even,
 *  board potential connectable dots
 *
 * @param {Object}
 *    @param {Array<Number>} dotTypes
 *    @param {Array<String>} colors
 *    @param {Function} callback
 *
 * @param {Number} num
 * @param {String} allClearColor
 */
const generator = (
  {
    dotTypes = [DOT_TYPE_DOT],
    colors = allColors,
    callback = defaultGeneratorCallback
  } = {
    dotTypes: [DOT_TYPE_DOT],
    colors: allColors,
    callback: defaultGeneratorCallback
  }
) => (num = 0, allClearColor = '') => {
  if (allClearColor === '') {
    return Array.from({ length: num }).map((e, i, a) =>
      callback(e, i, a, dotTypes, colors)
    );
  } else {
    const newColors = colors.filter(c => c !== allClearColor);
    return Array.from({ length: num }).map((e, i, a) =>
      callback(e, i, a, dotTypes, newColors)
    );
  }
};

function defaultGeneratorCallback(e, i, a, dotTypes, colors) {
  return {
    type: dotTypes.length > 1 ? dotTypes[random(dotTypes.length)] : dotTypes[0],
    color: colors.length > 1 ? colors[random(colors.length)] : colors[0],
    isActive: false, // for animate effect
    isClear: false, // for clear effect
    isBounce: false // for bounce effect
  };
}

export default generator;
