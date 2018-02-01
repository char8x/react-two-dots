import {
  COLOR_BLUE,
  COLOR_YELLOW,
  COLOR_RED,
  COLOR_PURPLE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DOT_TYPE_DOT,
  DOT_TYPE_EMPTY
} from './constants'

import random from './random-index'

/**
 * Generate new dots
 *
 * Defferent level have different dot generation method,how to generate dots is the key of
 * this game
 *
 * possible variable:
 *  num,
 *  colors,
 *  dotTypes,
 *  column odd or even,
 *  matrix potential connectable dots
 *
 * @param {*} num
 * @param {*} colors
 * @param {*} dotTypes
 */
export const genrateDots = (
  { colors, dotTypes = [DOT_TYPE_DOT] } = {
    colors: [COLOR_BLUE, COLOR_YELLOW, COLOR_RED, COLOR_PURPLE],
    dotTypes: [DOT_TYPE_DOT]
  }
) => num => {
  return Array.from({ length: num }).map((e, i) => {
    return {
      type: dotTypes[random(dotTypes.length)],
      color: colors[random(colors.length)]
    }
  })
}

/**
 *  Remove connected dots and add new dots TODO:
 *
 * @param {*} matrix
 * @param {*} connectedDots
 */
export const removeDots = matrix => connectedDots => {
  connectedDots.map(e => e.col).forEach(col => {
    const dots = connectedDots.filter(e => e.col === col)
    dots.sort((a, b) => a - b)
    if (dots.length > 1 && dots[1].row - dots[0].row !== 1) {
      // not adjacent
      dots.forEach(d => matrix[col].splice(d.row, 1))
    } else {
      matrix[col].splice(dots[0].row, dots.length)
    }
    // add new dots
    matrix[col].push(...genrateDots()(dots.length))
  })
}

export const blueCol = genrateDots({ colors: [COLOR_BLUE] })(5)
export const yellowCol = genrateDots({ colors: [COLOR_YELLOW] })(5)
export const redCol = genrateDots({ colors: [COLOR_RED] })(5)
export const purpleCol = genrateDots({ colors: [COLOR_PURPLE] })(5)

const colA = [
  {
    type: DOT_TYPE_DOT,
    color: COLOR_YELLOW
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_YELLOW
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_YELLOW
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_YELLOW
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_BLUE
  }
]
const colB = [
  {
    type: DOT_TYPE_DOT,
    color: COLOR_RED
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_RED
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_RED
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_RED
  },
  {
    type: DOT_TYPE_DOT,
    color: COLOR_PURPLE
  }
]

export const matrix = [blueCol, colA, colB, redCol, purpleCol]

export const isAdjacent = matrix => (dotA, dotB) =>
  matrix[dotA.col][dotA.row] === matrix[dotB.col][dotB.row] &&
  (dotA.col - 1 === dotB.col ||
    dotA.col + 1 === dotB.col ||
    dotA.row - 1 === dotB.row ||
    dotA.row + 1 === dotB.row)

export const isOppositeDirection = (directA, directB) => {
  switch (directA) {
    case DIRECTION_UP:
      return directB === DIRECTION_DOWN
    case DIRECTION_DOWN:
      return directB === DIRECTION_UP
    case DIRECTION_LEFT:
      return directB === DIRECTION_RIGHT
    case DIRECTION_RIGHT:
      return directB === DIRECTION_LEFT
    default:
      return false
  }
}

export const lineDeg = {
  DIRECTION_UP: 270,
  DIRECTION_LEFT: 180,
  DIRECTION_DOWN: 90,
  DIRECTION_RIGHT: 0
}
