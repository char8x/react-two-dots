import {
  INIT_GAME,
  SHOW_MATRIX,
  PANNING_START,
  ENTER_DOT,
  LEAVE_DOT,
  BEFORE_PANNING_END,
  PANNING_END,
  PANNING,
  RESET_DOT_STATE,
  REFRESH_MATRIX,
  RESTART_GAME
} from './actions'
import {
  isAdjacent,
  isSameDot,
  lineDeg,
  removeDots,
  rectangleExist,
  addNewDots
} from '../../utils/matrix'
import { DOT_TYPE_DOT } from '../../utils/constants'
import clone from '../../utils/clone'
import initLevels from '../../models/levels'

const resetProp = {
  panningDot: null,
  panDirection: null,
  dotColor: '',
  rectangle: false,
  linePosition: {
    x: 0,
    y: 0
  },
  connectedDots: [],
  connectedLines: [],
  bounceStartDots: [] // col start bounce dot
}

const initState = {
  ...resetProp,
  showMatrix: false,
  level: 0,
  goals: [],
  matrix: [[]],
  colLength: 0,
  chances: 0,
  clearDots: 0,
  score: 0,
  showStart: true,
  showSuccess: false,
  showFailure: false
}

export default (state = initState, action) => {
  const {
    matrix,
    colLength,
    connectedDots,
    connectedLines,
    panningDot,
    linePosition,
    bounceStartDots,
    chances,
    clearDots,
    goals,
    rectangle,
    dotColor
  } = state
  switch (action.type) {
    case INIT_GAME:
      const data = initLevels[action.level - 1].data()
      return {
        ...state,
        matrix: data.matrix,
        colLength: data.matrix[0].length,
        level: action.level,
        chances: data.chance,
        goals: data.goals,
        clearDots: 0,
        score: 0,
        showMatrix: false,
        showStart: true,
        showSuccess: false,
        showFailure: false
      }
    case SHOW_MATRIX:
      return {
        ...state,
        showStart: false,
        showMatrix: true
      }
    case PANNING_START:
      const newConnectedDots = clone(connectedDots)
      newConnectedDots.push(action.dot)
      return {
        ...state,
        connectedDots: newConnectedDots,
        panningDot: action.dot,
        linePosition: action.position
      }
    case PANNING:
      return {
        ...state,
        panDirection: action.direction
      }
    case ENTER_DOT:
      // if dot is slibing dot with panningDot
      const { adjacent, direction } = isAdjacent(matrix)(panningDot, action.dot)
      const color = matrix[panningDot.col][panningDot.row].color

      if (adjacent) {
        if (
          connectedDots.length >= 2 &&
          isSameDot(connectedDots[connectedDots.length - 2], action.dot)
        ) {
          // the dot already connected
          const clonedConnectedDots = clone(connectedDots)
          const clonedConnectedLines = clone(connectedLines)
          clonedConnectedDots.pop()
          const lastLine = clonedConnectedLines.pop()
          if (lastLine == null) return state
          return {
            ...state,
            rectangle: false,
            connectedDots: clonedConnectedDots,
            connectedLines: clonedConnectedLines,
            panningDot: clonedConnectedDots[clonedConnectedDots.length - 1],
            linePosition: { x: lastLine.x, y: lastLine.y }
          }
        } else {
          // add new dot
          const newConnectedDots = clone(connectedDots)
          const newConnectedLines = clone(connectedLines)
          newConnectedDots.push(action.dot)
          newConnectedLines.push({
            direction,
            deg: lineDeg[direction],
            color: color,
            ...linePosition
          })

          if (rectangleExist(newConnectedDots)) {
            const newMatrix = clone(matrix)
            newMatrix.forEach((col, i) => {
              col.forEach(d => {
                if (d.color === color && d.type === DOT_TYPE_DOT) {
                  d.isActive = true
                }
              })
            })
            return {
              ...state,
              rectangle: true,
              dotColor: color,
              matrix: newMatrix,
              connectedDots: newConnectedDots,
              connectedLines: newConnectedLines,
              panningDot: action.dot,
              linePosition: action.position
            }
          }
          return {
            ...state,
            rectangle: false,
            dotColor: color,
            connectedDots: newConnectedDots,
            connectedLines: newConnectedLines,
            panningDot: action.dot,
            linePosition: action.position
          }
        }
      }

      return state
    case LEAVE_DOT:
      const clonedConnectedDots = clone(connectedDots)
      const clonedConnectedLines = clone(connectedLines)
      clonedConnectedDots.pop()
      const lastLine = clonedConnectedLines.pop()

      return {
        ...state,
        rectangle: false,
        connectedDots: clonedConnectedDots,
        connectedLines: clonedConnectedLines,
        panningDot: clonedConnectedDots[clonedConnectedDots.length - 1],
        linePosition: { x: lastLine.x, y: lastLine.y }
      }
    case BEFORE_PANNING_END:
      if (connectedDots.length > 1) {
        const newMatrix = clone(matrix)
        if (rectangle) {
          const color = matrix[connectedDots[0].col][connectedDots[0].row].color
          newMatrix.forEach(col => {
            col.forEach(row => {
              if (row.color === color && row.type === DOT_TYPE_DOT) {
                row.isClear = true
              }
            })
          })
        } else {
          connectedDots.forEach(d => (newMatrix[d.col][d.row].isClear = true))
        }
        return {
          ...state,
          connectedLines: [],
          matrix: newMatrix
        }
      }
      return {
        ...state,
        ...resetProp
      }
    case PANNING_END:
      if (connectedDots.length > 1) {
        const newMatrix = clone(matrix)
        const { startDots, removedDotsCount, color } = removeDots(newMatrix)(
          connectedDots
        )
        let newGoals = clone(goals)
        for (let i = 0; i < newGoals.length; i++) {
          if (newGoals[i].color === color) {
            newGoals[i].clear += removedDotsCount
          }
        }

        return {
          ...state,
          ...resetProp,
          dotColor, // keep for REFRESH_MATRIX
          rectangle, // keep for REFRESH_MATRIX
          bounceStartDots: startDots,
          matrix: newMatrix,
          chances: chances - 1,
          clearDots: clearDots + removedDotsCount,
          goals: newGoals
        }
      }
      return {
        ...state,
        ...resetProp
      }
    case REFRESH_MATRIX:
      const tempMatrix = clone(matrix)
      addNewDots(tempMatrix, colLength, rectangle && dotColor)
      // update bounce effect
      bounceStartDots.forEach(d => {
        for (let i = d.row; i < tempMatrix[d.col].length && i >= 0; i++) {
          tempMatrix[d.col][i].isBounce = true
        }
      })

      // fulfill goals
      if (goals.every(g => g.clear >= g.goal)) {
        // Game succeed
        return {
          ...state,
          ...resetProp,
          matrix: tempMatrix,
          showSuccess: true
        }
      }

      // out of chances
      if (chances === 0) {
        return {
          ...state,
          ...resetProp,
          matrix: tempMatrix,
          showFailure: true
        }
      }

      return {
        ...state,
        ...resetProp,
        bounceStartDots,
        matrix: tempMatrix
      }
    case RESET_DOT_STATE:
      let newMatrix = null
      if (action.property === 'isBounce' && bounceStartDots.length > 0) {
        newMatrix = clone(matrix)
        bounceStartDots.forEach(d => {
          for (let i = d.row; i < newMatrix[d.col].length && i >= 0; i++) {
            newMatrix[d.col][i].isBounce = false
          }
        })
        return {
          ...state,
          bounceStartDots: [],
          matrix: newMatrix
        }
      } else if (
        action.property === 'isActive' &&
        rectangle &&
        dotColor !== ''
      ) {
        newMatrix = clone(matrix)
        newMatrix.forEach((col, i) => {
          col.forEach(d => {
            if (d.color === dotColor && d.type === DOT_TYPE_DOT) {
              d.isActive = false
            }
          })
        })
        return {
          ...state,
          matrix: newMatrix
        }
      } else if (action.property === 'isClear' && connectedDots.length > 1) {
        newMatrix = clone(matrix)
        if (rectangle) {
          const color = matrix[connectedDots[0].col][connectedDots[0].row].color
          newMatrix.forEach(col => {
            col.forEach(row => {
              if (row.color === color && row.type === DOT_TYPE_DOT) {
                row.isClear = false
              }
            })
          })
        } else {
          connectedDots.forEach(d => (newMatrix[d.col][d.row].isClear = false))
        }
        return {
          ...state,
          matrix: newMatrix
        }
      }
      return state
    case RESTART_GAME:
      return {}
    default:
      return state
  }
}
