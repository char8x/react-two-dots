import {
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW,
  COLOR_GREEN,
  DOT_TYPE_DOT
} from '../utils/constants';

import generator from '../utils/generator';

const gbd = generator({
  colors: [COLOR_BLUE],
  dotTypes: [DOT_TYPE_DOT]
});
const gyd = generator({
  colors: [COLOR_YELLOW],
  dotTypes: [DOT_TYPE_DOT]
});
const grd = generator({
  colors: [COLOR_RED],
  dotTypes: [DOT_TYPE_DOT]
});
const gpd = generator({
  colors: [COLOR_PURPLE],
  dotTypes: [DOT_TYPE_DOT]
});
const ggd = generator({
  colors: [COLOR_GREEN],
  dotTypes: [DOT_TYPE_DOT]
});

/**
 * Generate Dot Goals
 *
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
      };
    }
  })(num);
};

/**
 *  Generate Board Column
 *
 * @param {*} array
 */
const gm = (array = []) => array.reduce((p, c) => p.concat(c), []);

let currentLevel = null;
// levels data
const datas = [
  {
    // level 1
    data: () => {
      currentLevel = {
        chance: 20,
        goals: gdg(15, 3, [COLOR_BLUE, COLOR_RED, COLOR_YELLOW]),
        array: (() => {
          return gm([
            gbd(3),
            grd(1),
            gyd(3),
            grd(1),
            gbd(3),
            grd(1),
            gyd(3),
            grd(1)
          ]);
        })(),
        height: 4,
        gen: generator({
          colors: [COLOR_BLUE, COLOR_RED, COLOR_YELLOW],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  },
  {
    // level 2
    data: () => {
      currentLevel = {
        chance: 30,
        goals: gdg(15, 4, [COLOR_GREEN, COLOR_YELLOW, COLOR_RED, COLOR_BLUE]),
        array: (() => {
          return gm([
            gbd(1),
            gyd(1),
            grd(3),
            gbd(1),
            gyd(3),
            grd(1),
            gbd(1),
            ggd(4),
            gbd(1),
            gyd(3),
            grd(1),
            gbd(1),
            gyd(1),
            grd(3)
          ]);
        })(),
        height: 5,
        gen: generator({
          colors: [COLOR_GREEN, COLOR_YELLOW, COLOR_RED, COLOR_BLUE],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  },
  {
    // level 3
    data: () => {
      currentLevel = {
        chance: 20,
        goals: gdg(50, 3, [COLOR_RED, COLOR_BLUE, COLOR_YELLOW]),
        array: (() => {
          return gm([
            grd(1),
            gbd(1),
            grd(1),
            gbd(1),
            gyd(1),
            grd(1),
            gyd(1),
            grd(1),
            gbd(1),
            gyd(1),
            grd(1),
            gyd(1),
            grd(1),
            gbd(1),
            grd(2),
            gyd(1),
            gbd(1),
            gbd(1),
            gyd(1),
            grd(2),
            gbd(1),
            grd(1),
            gyd(1),
            grd(1),
            gyd(1),
            gbd(1),
            grd(1),
            gbd(1),
            grd(1),
            gyd(1),
            gbd(1),
            grd(1),
            gbd(1),
            grd(1)
          ]);
        })(),
        height: 6,
        gen: generator({
          colors: [COLOR_RED, COLOR_BLUE, COLOR_YELLOW],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  },
  {
    // level 4
    data: () => {
      currentLevel = {
        chance: 35,
        goals: gdg(15, 4, [COLOR_PURPLE, COLOR_RED, COLOR_GREEN, COLOR_YELLOW]),
        array: (() => {
          return gm([
            gpd(1),
            grd(1),
            ggd(2),
            gpd(2),
            ggd(2),
            gyd(2),
            ggd(1),
            gyd(1),
            ggd(1),
            gpd(1),
            grd(1),
            gyd(2),
            ggd(1),
            ggd(1),
            gyd(1),
            grd(1),
            ggd(1),
            gpd(2)
          ]);
        })(),
        height: 6,
        gen: generator({
          colors: [COLOR_PURPLE, COLOR_RED, COLOR_GREEN, COLOR_YELLOW],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  },
  {
    // TODO: level 5
    data: () => {
      currentLevel = {
        chance: 30,
        goals: gdg(50, 4, [COLOR_PURPLE, COLOR_RED, COLOR_GREEN, COLOR_YELLOW]),
        array: (() => {
          return gm([
            gpd(8),
            grd(6),
            gpd(1),
            grd(1),
            ggd(5),
            gpd(1),
            grd(1),
            ggd(1),
            gyd(4),
            gpd(1),
            grd(1),
            ggd(1),
            gyd(1),
            gpd(4),
            grd(1),
            ggd(1),
            gyd(1),
            gpd(1),
            grd(1),
            gpd(2),
            grd(1),
            ggd(1),
            gyd(1),
            gpd(3)
          ]);
        })(),
        height: 7,
        gen: generator({
          colors: [COLOR_PURPLE, COLOR_BLUE, COLOR_GREEN, COLOR_YELLOW],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  }
  /*  {
    // level 6
    data: () => {
      currentLevel = {
        chance: 47,
        goals: gdg(20, 2, [COLOR_RED, COLOR_YELLOW]),
        array: (() => {
          return gm([
            gpd(1),
            grd(1),
            gpd(2),
            ggd(1),
            gbd(1),
            grd(1),
            gyd(2),
            ggd(1),
            gbd(1),
            gyd(2),
            ggd(1),
            gyd(1),
            grd(2),
            ggd(2),
            gpd(1),
            ggd(2),
            gbd(2),
            gpd(1)
          ]);
        })(),
        height: 5,
        gen: generator({
          colors: [
            COLOR_RED,
            COLOR_YELLOW,
            COLOR_PURPLE,
            COLOR_BLUE,
            COLOR_GREEN
          ],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  },
  {
    // TODO: level 7
    data: () => {
      currentLevel = {
        chance: 1,
        goals: gdg(2, 1, [COLOR_RED]),
        array: (() => {
          return gm([
            gpd(1),
            grd(1),
            gpd(2),
            ggd(1),
            gbd(1),
            grd(1),
            gyd(2),
            ggd(1),
            gbd(1),
            gyd(2),
            ggd(1),
            gyd(1),
            grd(2),
            ggd(2),
            gpd(1),
            ggd(2),
            gbd(2),
            gpd(1)
          ]);
        })(),
        height: 5,
        gen: generator({
          colors: [
            COLOR_RED,
            COLOR_YELLOW,
            COLOR_PURPLE,
            COLOR_BLUE,
            COLOR_GREEN
          ],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  },
  {
    // level 8
    data: () => {
      currentLevel = {
        chance: 47,
        goals: gdg(2, 1, [COLOR_RED]),
        array: (() => {
          return gm([gpd(1), grd(1), gpd(2), grd(4), ggd(4), ggd(2), gbd(2)]);
        })(),
        height: 4,
        gen: generator({
          colors: [
            COLOR_RED,
            COLOR_YELLOW,
            COLOR_PURPLE,
            COLOR_BLUE,
            COLOR_GREEN
          ],
          dotTypes: [DOT_TYPE_DOT]
        })
      };
      return currentLevel;
    }
  } */
];

const maxLevel = datas.length;

const levels = datas.map((e, i) =>
  Object.assign(e, {
    level: i + 1,
    score: 0,
    active: false
  })
);

levels[0].active = true;

export default levels;
export { currentLevel, maxLevel };
