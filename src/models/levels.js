import {
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW,
  COLOR_GREEN,
  DOT_TYPE_DOT
} from '../utils/constants'

import generator from '../utils/generator'

const gbd = generator({
  colors: [COLOR_BLUE],
  dotTypes: [DOT_TYPE_DOT]
})
const gyd = generator({
  colors: [COLOR_YELLOW],
  dotTypes: [DOT_TYPE_DOT]
})
const grd = generator({
  colors: [COLOR_RED],
  dotTypes: [DOT_TYPE_DOT]
})
const gpd = generator({
  colors: [COLOR_PURPLE],
  dotTypes: [DOT_TYPE_DOT]
})
const ggd = generator({
  colors: [COLOR_GREEN],
  dotTypes: [DOT_TYPE_DOT]
})

/**
 * Generate Dot Goals
 * @param {*} goal
 * @param {*} num
 * @param {*} colors
 */
const gdg = (goal, num, colors) => {
  return generator({
    colors,
    dotTypes: [DOT_TYPE_DOT],
    callback: (e, i, a, dotTypes, colors) => {
      return {
        goal,
        clear: 0,
        type: dotTypes[0],
        color: colors[i]
      }
    }
  })(num)
}

/**
 *  Generate Matrix
 * @param {*} array
 */
const gm = (array = []) => array.reduce((p, c) => p.concat(c), [])

const data = [
  {
    chance: 20,
    goals: gdg(15, 3, [COLOR_BLUE, COLOR_RED, COLOR_YELLOW]),
    matrix: (() => {
      return [
        gm([gbd(3), grd(1)]),
        gm([gyd(3), grd(1)]),
        gm([gbd(3), grd(1)]),
        gm([gyd(3), grd(1)])
      ]
    })(),
    gen: generator({
      colors: [COLOR_BLUE, COLOR_RED, COLOR_YELLOW],
      dotTypes: [DOT_TYPE_DOT]
    })
  },
  {
    chance: 30,
    goals: gdg(15, 4, [COLOR_GREEN, COLOR_YELLOW, COLOR_RED, COLOR_BLUE]),
    matrix: (() => {
      return [
        gm([gbd(1), gyd(1), grd(3)]),
        gm([gbd(1), gyd(3), grd(1)]),
        gm([gbd(1), ggd(4)]),
        gm([gbd(1), gyd(3), grd(1)]),
        gm([gbd(1), gyd(1), grd(3)])
      ]
    })(),
    gen: generator({
      colors: [COLOR_GREEN, COLOR_YELLOW, COLOR_RED, COLOR_BLUE],
      dotTypes: [DOT_TYPE_DOT]
    })
  }
]

const levels = data.map((e, i) =>
  Object.assign(e, {
    level: i + 1,
    score: 0,
    active: false
  })
)

levels[0].active = true

export default levels
