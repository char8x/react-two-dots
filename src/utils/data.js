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
      color: colors[random(colors.length)],
      isActive: false, // for animate effect
      isClear: false // for clear effect
    }
  })
}

/**
 * Check if exists rectangle
 *
 * @param {*} connectedDots
 */
export const rectangleExist = connectedDots => {
  const repeatDot = connectedDots[connectedDots.length - 1]
  if (connectedDots.length >= 5) {
    if (connectedDots.length % 2 === 0) {
      const subDots = connectedDots.slice(0, 2)
      if (
        subDots.find(e => e.col === repeatDot.col && e.row === repeatDot.row)
      ) {
        return true
      } else {
        return rectangleExist(connectedDots.slice(2))
      }
    } else {
      const subDots = connectedDots.slice(0, 1)
      if (
        subDots.find(e => e.col === repeatDot.col && e.row === repeatDot.row)
      ) {
        return true
      } else {
        return rectangleExist(connectedDots.slice(1))
      }
    }
  }

  return false
}

/**
 *  Remove connected dots and add new dots
 *
 * @param {*} matrix
 * @param {*} connectedDots
 */
export const removeDots = matrix => connectedDots => {
  if (rectangleExist(connectedDots)) {
    // first check if there is rectangle,then remove all the same color dots
    const color = matrix[connectedDots[0].col][connectedDots[0].row].color
    matrix.forEach((col, i) => {
      const colLength = col.length
      matrix[i] = col.filter(
        d => !(d.color === color && d.type === DOT_TYPE_DOT)
      )
      // TODO: add new dots
      // const newDots = genrateDots()(colLength - matrix[i].length)
      // matrix[i].push(...newDots)
    })
  } else {
    connectedDots
      .map(e => e.col)
      .filter((v, i, a) => a.indexOf(v) === i) // unique col
      .forEach(col => {
        const dotRows = connectedDots.filter(e => e.col === col).map(d => d.row)
        matrix[col] = matrix[col].filter((d, i) => dotRows.indexOf(i) === -1)
        // TODO: add new dots
        // const newDots = genrateDots()(dotRows.length)
        // matrix[col].push(...newDots)
      })
  }
}

export const addNewDots = (matrix, colLength) => {
  matrix.forEach((col, i) => {
    // TODO: add new dots
    const newDots = genrateDots()(colLength - matrix[i].length)
    matrix[i].push(...newDots)
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

export const originalMatrix = [blueCol, colA, colB, redCol, purpleCol]

/**
 * if is same color and same type
 *
 *  dotA: start
 *  dotB: end
 *
 * @param {*} matrix
 */
export const isAdjacent = matrix => (dotA, dotB) => {
  const pointA = matrix[dotA.col][dotA.row]
  const pointB = matrix[dotB.col][dotB.row]
  if (
    pointA.type === DOT_TYPE_DOT &&
    pointA.type === pointB.type &&
    pointA.color === pointB.color
  ) {
    if (dotA.col - 1 === dotB.col) {
      return {
        adjacent: true,
        direction: DIRECTION_LEFT
      }
    } else if (dotA.col + 1 === dotB.col) {
      return {
        adjacent: true,
        direction: DIRECTION_RIGHT
      }
    } else if (dotA.row - 1 === dotB.row) {
      return {
        adjacent: true,
        direction: DIRECTION_DOWN
      }
    } else if (dotA.row + 1 === dotB.row) {
      return {
        adjacent: true,
        direction: DIRECTION_UP
      }
    }
    return {
      adjacent: false
    }
  }
  return false
}

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
