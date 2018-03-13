import {
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW,
  COLOR_GREEN,
  DOT_TYPE_DOT
} from '../utils/constants'

import { grd, gbd, gpd, gyd, ggd, generator } from '../utils/data'

/**
 * Generate Dot Goals
 * @param {*} goal
 * @param {*} num
 * @param {*} colors
 */
const gdg = (goal, num, colors) =>
  generator({
    colors,
    dotTypes: [DOT_TYPE_DOT],
    callback: (e, i, a, dotTypes, colors) => {
      return {
        goal,
        type: dotTypes[0],
        color: colors[i]
      }
    }
  })(num)

/**
 *  Generate Matrix
 * @param {*} array
 */
const gm = (array = []) => array.reduce((p, c) => p.concat(c), [])

const levels = [
  {
    level: 1,
    chance: 20,
    goals: gdg(15, 3, [COLOR_BLUE, COLOR_RED, COLOR_YELLOW]),
    matrix: (() => {
      return gm([
        gm([gbd(3), grd(1)]),
        gm([gyd(3), grd(1)]),
        gm([gbd(3), grd(1)]),
        gm([gyd(3), grd(1)])
      ])
    })(),
    generate: generator({
      colors: [COLOR_BLUE, COLOR_RED, COLOR_YELLOW],
      dotTypes: [DOT_TYPE_DOT]
    }),
    score: 0,
    active: true
  },
  {
    level: 2,
    chance: 30,
    goals: gdg(15, 4, [COLOR_GREEN, COLOR_YELLOW, COLOR_RED, COLOR_BLUE]),
    matrix: (() => {
      return gm([
        gm([gbd(1), gyd(1), grd(3)]),
        gm([gbd(1), gyd(3), grd(1)]),
        gm([gbd(1), ggd(4)]),
        gm([gbd(1), gyd(3), grd(1)]),
        gm([gbd(1), gyd(1), grd(3)])
      ])
    })(),
    generate: generator({
      colors: [COLOR_GREEN, COLOR_YELLOW, COLOR_RED, COLOR_BLUE],
      dotTypes: [DOT_TYPE_DOT]
    }),
    score: 0,
    active: false
  }
]

export default levels
