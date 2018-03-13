import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DOT_TYPE_DOT
} from './constants'
import levels from '../models/levels'

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
  const bounceStartDots = []
  let removedDotsCount = 0
  const color = matrix[connectedDots[0].col][connectedDots[0].row].color
  if (rectangleExist(connectedDots)) {
    // first check if there is rectangle,then remove all the same color dots
    matrix.forEach((col, i) => {
      // calculate start bounce dot position
      bounceStartDots.push({
        col: i,
        row: col.findIndex(d => d.color === color && d.type === DOT_TYPE_DOT)
      })
      // calculate removed dot count (fast because of for loop optimization)
      for (let j = 0; j < col.length; j++) {
        if (col[j].color === color && col[j].type === DOT_TYPE_DOT) {
          removedDotsCount++
        }
      }
      // remove dots
      matrix[i] = col.filter(
        d => !(d.color === color && d.type === DOT_TYPE_DOT)
      )
    })
  } else {
    removedDotsCount = connectedDots.length
    connectedDots
      .map(e => e.col)
      .filter((v, i, a) => a.indexOf(v) === i) // unique col
      .forEach(col => {
        const dotRows = connectedDots
          .filter(e => e.col === col)
          .map(d => d.row)
          .sort((a, b) => a - b)
        // calculate start bounce dot position
        bounceStartDots.push({
          col,
          row: dotRows[0]
        })
        // remove dots
        matrix[col] = matrix[col].filter((d, i) => dotRows.indexOf(i) === -1)
      })
  }
  return {
    removedDotsCount,
    color,
    startDots: bounceStartDots
  }
}

export const addNewDots = (matrix, colLength, level, dotColor) => {
  const gen = levels[level - 1].gen

  matrix.forEach((col, i) => {
    // add new dots
    matrix[i] = matrix[i].concat(gen(colLength - matrix[i].length, dotColor))
  })
}

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
    if (dotA.col - 1 === dotB.col && dotA.row === dotB.row) {
      return {
        adjacent: true,
        direction: DIRECTION_LEFT
      }
    } else if (dotA.col + 1 === dotB.col && dotA.row === dotB.row) {
      return {
        adjacent: true,
        direction: DIRECTION_RIGHT
      }
    } else if (dotA.row - 1 === dotB.row && dotA.col === dotB.col) {
      return {
        adjacent: true,
        direction: DIRECTION_DOWN
      }
    } else if (dotA.row + 1 === dotB.row && dotA.col === dotB.col) {
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
