import {
  COLOR_BLUE,
  COLOR_YELLOW,
  COLOR_RED,
  COLOR_PURPLE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_RIGHT
} from './constants'

export const blueCol = Array.from({ length: 5 }).map(e => COLOR_BLUE)
export const yellowCol = Array.from({ length: 5 }).map(e => COLOR_YELLOW)
export const redCol = Array.from({ length: 5 }).map(e => COLOR_RED)
export const purpleCol = Array.from({ length: 5 }).map(e => COLOR_PURPLE)

const colA = [
  COLOR_YELLOW,
  COLOR_YELLOW,
  COLOR_YELLOW,
  COLOR_YELLOW,
  COLOR_BLUE
]
const colB = [COLOR_RED, COLOR_RED, COLOR_RED, COLOR_RED, COLOR_PURPLE]

export const matrix = [blueCol, colA, colB, redCol, purpleCol]

export const isAdjacent = (dotA, dotB) =>
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
