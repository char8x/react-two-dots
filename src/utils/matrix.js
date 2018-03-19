import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DOT_TYPE_DOT
} from './constants';
import { currentLevel } from '../models/levels';
import randomIndex from './random-index';

/**
 * Check if exists rectangle
 *
 * @param {Array<Number>} connectedDots
 */
const rectangleExist = connectedDots => {
  const repeatDot = connectedDots[connectedDots.length - 1];
  if (connectedDots.length >= 5) {
    if (connectedDots.length % 2 === 0) {
      const subDots = connectedDots.slice(0, 2);
      if (subDots.find(e => e === repeatDot)) {
        return true;
      } else {
        return rectangleExist(connectedDots.slice(2));
      }
    } else {
      const subDots = connectedDots.slice(0, 1);
      if (subDots.find(e => e === repeatDot)) {
        return true;
      } else {
        return rectangleExist(connectedDots.slice(1));
      }
    }
  }

  return false;
};

/**
 *  Remove connected dots and add new dots
 *
 * @param {Array<Number>} array board array
 * @param {number} height board height
 * @param {Array<Number>} connectedDots
 */
const removeDots = (array, height) => connectedDots => {
  const bounceStartDots = [];
  let removedDotsCount = 0;
  const color = array[connectedDots[0]].color;

  // first check if there is rectangle,then remove all the same color dots
  if (rectangleExist(connectedDots)) {
    // iterate board
    for (let i = 0; i < array.length; i = i + height) {
      let bounceStartDot = null;
      // iterate board vertical column
      for (let j = 0; j < i + height; j++) {
        let dot = array[j];
        if (dot.color === color && dot.type === DOT_TYPE_DOT) {
          // calculate start bounce dot position
          if (bounceStartDot === null) {
            bounceStartDot = j;
            bounceStartDots.push(j);
          }
          // calculate removed dot count
          removedDotsCount++;
          // remove dots
          array[j] = null;
        }
      }
      // regenerate col
      const colArray = array.slice(i, i + height).filter(e => e !== null);
      if (colArray.length > 0) {
        const newCol = colArray.concat(
          new Array(height - colArray.length).fill(null)
        );
        array.splice(i, height, ...newCol);
      }
    }
  } else {
    removedDotsCount = connectedDots.length;
    // remove dots
    for (const idx of connectedDots) {
      array[idx] = null;
    }
    connectedDots
      .map(e => Math.floor(e / height))
      .filter((v, i, a) => a.indexOf(v) === i) // unique col
      .forEach(col => {
        // calculate start bounce dot position
        let dots = connectedDots
          .filter(e => Math.floor(e / height) === col)
          .sort((a, b) => a - b);
        bounceStartDots.push(dots[0]);
        // regenerate col
        const colArray = array
          .slice(col * height, col * height + height)
          .filter(e => e !== null);
        if (colArray.length > 0) {
          const newCol = colArray.concat(
            new Array(height - colArray.length).fill(null)
          );
          array.splice(col * height, height, ...newCol);
        }
      });
  }
  return {
    removedDotsCount,
    color,
    startDots: bounceStartDots
  };
};

/**
 * Generate new dots
 *
 * @param {*} array
 * @param {*} height
 * @param {*} dotColor
 */
const addNewDots = (array, height, dotColor) => {
  const gen = currentLevel.gen;
  for (let i = 0; i < array.length; i = i + height) {
    // regenerate col
    const colArray = array.slice(i, i + height).filter(e => e !== null);
    if (colArray.length > 0) {
      const newCol = colArray.concat(gen(height - colArray.length, dotColor));
      array.splice(i, height, ...newCol);
    }
  }
};

const isSameDotType = (dotA, dotB) => {
  return (
    dotA.type === DOT_TYPE_DOT &&
    dotA.type === dotB.type &&
    dotA.color === dotB.color
  );
};

/**
 * if is same color and same type
 *
 *  dotA: start
 *  dotB: end
 *
 * @param {*} array
 */
const isAdjacent = (array, height) => (dotA, dotB) => {
  const pointA = array[dotA];
  const pointB = array[dotB];
  if (isSameDotType(pointA, pointB)) {
    if (dotA + height === dotB) {
      return {
        adjacent: true,
        direction: DIRECTION_LEFT
      };
    } else if (dotA - height === dotB) {
      return {
        adjacent: true,
        direction: DIRECTION_RIGHT
      };
    } else if (dotA - 1 === dotB) {
      return {
        adjacent: true,
        direction: DIRECTION_DOWN
      };
    } else if (dotA + 1 === dotB) {
      return {
        adjacent: true,
        direction: DIRECTION_UP
      };
    }
    return {
      adjacent: false
    };
  }
  return false;
};

const hasAdjacentDot = (array, height, idx) => {
  const dot = array[idx];
  if (array[idx + 1] && isSameDotType(dot, array[idx + 1])) {
    return true;
  } else if (array[idx - 1] && isSameDotType(dot, array[idx - 1])) {
    return true;
  } else if (array[idx + height] && isSameDotType(dot, array[idx + height])) {
    return true;
  } else if (array[idx - height] && isSameDotType(dot, array[idx - height])) {
    return true;
  }
  return false;
};

/**
 * If matrix exist adjacent dot
 *
 * @param {*} matrix
 */
const existAdjacentDot = (array, height) => {
  for (let i = 0; i < array.length; i = i + 2) {
    if (hasAdjacentDot(array, height, i)) {
      return true;
    }
  }
  return false;
};

export const shuffleArray = array => {
  let shuffleTime = 1;
  const shuffle = array => {
    for (let i = 0; i < array.length; i++) {
      let idx = randomIndex(array.length);
      if (array[i].type === DOT_TYPE_DOT && array[idx].type === DOT_TYPE_DOT) {
        [array[i], array[idx]] = [array[idx], array[i]];
      }
    }
  };
  while (shuffleTime < 50 && !existAdjacentDot(array)) {
    shuffle(array);
    shuffleTime++;
  }
  // TODO: after try 50 times still has no adjacent dot
  if (!existAdjacentDot(array)) {
    throw new Error('There is no possible move!');
  }

  return array;
};

const isOppositeDirection = (directA, directB) => {
  switch (directA) {
    case DIRECTION_UP:
      return directB === DIRECTION_DOWN;
    case DIRECTION_DOWN:
      return directB === DIRECTION_UP;
    case DIRECTION_LEFT:
      return directB === DIRECTION_RIGHT;
    case DIRECTION_RIGHT:
      return directB === DIRECTION_LEFT;
    default:
      return false;
  }
};

const isSameDot = (dotA, dotB) => {
  return dotA === dotB;
};

const lineDeg = {
  DIRECTION_UP: 270,
  DIRECTION_LEFT: 180,
  DIRECTION_DOWN: 90,
  DIRECTION_RIGHT: 0
};

export default {
  rectangleExist,
  removeDots,
  addNewDots,
  isAdjacent,
  existAdjacentDot,
  isOppositeDirection,
  isSameDot,
  lineDeg
};
