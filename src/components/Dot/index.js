import 'pepjs' // Pointer Events Polyfill https://github.com/jquery/PEP
import Hammer from 'rc-hammerjs' // http://hammerjs.github.io/api/
import Pointable from 'react-pointable' // https://github.com/MilllerTime/react-pointable
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import _debounce from 'lodash/debounce'

import './index.css'
import { bounce, vanish, zoomOut } from '../../utils/animate-keyframes'
import Line from '../Line'
import { offset, shape, distance, angle } from '../../utils/dom'
import { isAdjacent, isOppositeDirection } from '../../utils/matrix'
import actions from '../../store/gamearea/actions'
import hammerDirection from '../../utils/hammerjs-direction'
import { DIRECTION_NONE } from '../../utils/constants'
// import _debug from '../../utils/debug'

// const eventDebugger = _debug('rtd:event')

export const Dot = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  cursor: pointer;

  ${props => {
    return `height: ${props.diam}px;
    width: ${props.diam}px;`
  }} overflow: hidden;
  box-shadow: none;
`

const AnimateDotTop = Dot.extend`
  ${props =>
    props.isBounce
      ? `animation-name: ${bounce};
  transform-origin: center bottom;
  animation-duration: 1s;
  animation-fill-mode: both;
  `
      : ''};

  ${props =>
    props.isClear
      ? `animation-name: ${zoomOut};
      transform-origin: center;
      animation-duration: 0.5s;
      animation-fill-mode: both;
      opacity: 1;`
      : ''};
`

const AnimateDotBottom = AnimateDotTop.extend`
  position: relative;
  top: -20px;
  z-index: -1;
  opacity: 0;

  ${props =>
    props.isActive
      ? `animation-name: ${vanish};
         animation-duration: 0.65s;
         animation-fill-mode: both;
         opacity: 1;`
      : ''};
`

const DotContainer = styled.div`
  height: 20px;
  margin: 10px;
`

class EnhancedDot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isBounce: true, // bounce effect
      isActive: false, // click wave effect
      isClear: false, // clear effect
      isPanning: false, // ensure only one dot is drawing line
      lineLength: 10, // same as dot radius
      lineHeight: 6,
      lineAngle: 0
    }
  }

  initState = () => {
    this.setState({
      isClear: false,
      isPanning: false,
      lineLength: 10,
      lineHeight: 6,
      lineAngle: 0
    })
  }

  handleTap = () => {
    // let dot only bounce once
    this.setState({ isActive: false })
    this.setState({ isActive: true })
    this.activeDotTimer = setTimeout(() => {
      this.setState({ isActive: false })
    }, 650) // equal or more than animation-duration (0.65s)
  }

  handleClear = () => {
    const { dispatch } = this.props
    this.setState({ isClear: true, isPanning: false })
    this.clearDotTimer = setTimeout(() => {
      this.initState()
      dispatch(actions.panningEnd())
    }, 300) // equal or more than animation-duration (300ms)
  }

  handleBounce = () => {
    this.setState({ isBounce: true })
    this.bounceTimer = setTimeout(() => {
      this.setState({ isBounce: false })
    }, 1000)
  }

  handlePanStart = e => {
    const { panningDot, col, row, dispatch } = this.props
    // debugger
    if (panningDot == null) {
      // calculate line start position
      const dotPosition = offset(e.target)
      const dotShape = shape(e.target)
      // 60 means topBar height
      dispatch(
        actions.panningStart(
          {
            col,
            row
          },
          {
            x: dotPosition.left + dotShape.width / 2,
            y:
              dotPosition.top +
              dotShape.height / 2 -
              this.state.lineHeight / 2 -
              60
          }
        )
      )
    }
    this.setState({
      isPanning: true
    })
    this.handleTap()
  }

  handlePanMove = e => {
    const { dispatch, panDirection, linePosition } = this.props

    // console.log(`panningDot ${panningDot.col} ${panningDot.row}`)
    // calculate length and rotate
    let pointer = {
      x: e.center.x,
      y: e.center.y - 60
    }
    this.setState({
      lineLength: distance(
        linePosition.x,
        linePosition.y,
        pointer.x,
        pointer.y
      ),
      lineAngle: angle(linePosition.x, linePosition.y, pointer.x, pointer.y)
    })

    // TODO: how to ensure accurate and just trigger once ?
    if (
      hammerDirection[e.direction] !== DIRECTION_NONE &&
      panDirection !== hammerDirection[e.direction]
    ) {
      dispatch(actions.panning(hammerDirection[e.direction]))
    }
  }

  handlePanEnd = () => {
    const { connectedLines, dispatch } = this.props
    // remove dots
    dispatch(actions.beforePanningEnd())
    // if no dots connected, clear global state
    if (connectedLines.length === 0) {
      this.initState()
    }
  }

  handlePanCancel = () => {
    // eventDebugger('handlePanCancel')
    const { connectedLines, dispatch } = this.props
    dispatch(actions.beforePanningEnd())
    if (connectedLines.length === 0) {
      this.initState()
    }
  }

  handleEnterDot = e => {
    const { panningDot, col, row, matrix, dispatch, rectangle } = this.props
    if (rectangle) {
      return
    }
    if (
      panningDot !== null &&
      !(panningDot.col === col && panningDot.row === row)
    ) {
      if (isAdjacent(matrix)(panningDot, { col, row }).adjacent) {
        this.handleTap()
      }
      // recalculate line start position
      const dotPosition = offset(e.target)
      const dotShape = shape(e.target)
      dispatch(
        actions.enterDot(
          { col, row },
          {
            x: dotPosition.left + dotShape.width / 2,
            y:
              dotPosition.top +
              dotShape.height / 2 -
              this.state.lineHeight / 2 -
              60
          }
        )
      )
    }
  }

  handleLeaveDot = () => {
    const {
      panningDot,
      panDirection,
      connectedLines,
      col,
      row,
      dispatch
    } = this.props
    if (
      connectedLines.length > 0 &&
      panningDot !== null &&
      (panningDot.col === col && panningDot.row === row) &&
      isOppositeDirection(
        panDirection,
        connectedLines[connectedLines.length - 1].direction
      )
    ) {
      dispatch(actions.leaveDot({ col, row }))
    }
  }

  componentDidMount() {
    this.bounceTimer = setTimeout(() => {
      this.setState({ isBounce: false })
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive) {
      this.handleTap()
      this.props.dispatch(
        actions.resetDotState(
          {
            col: this.props.col,
            row: this.props.row
          },
          'isActive'
        )
      )
    } else if (nextProps.isClear) {
      this.handleClear()
    } else if (
      this.props.isBounce !== nextProps.isBounce &&
      nextProps.isBounce
    ) {
      this.handleBounce()
      this.props.dispatch(
        actions.resetDotState(
          {
            col: this.props.col,
            row: this.props.row
          },
          'isBounce'
        )
      )
    }
  }

  componentWillUnmount() {
    clearTimeout(this.activeTimer)
    clearTimeout(this.clearDotTimer)
    clearTimeout(this.bounceTimer)
    // WARN: may be called multiple times,bad performance
    this.props.dispatch(actions.refreshMatrix())
  }

  render() {
    // col,row is for dot matrix position
    const { color, connectedLines, linePosition, rectangle } = this.props
    const {
      isBounce,
      isClear,
      isActive,
      isPanning,
      lineLength,
      lineHeight,
      lineAngle
    } = this.state
    return (
      <DotContainer>
        <Hammer
          onTap={this.handleTap}
          direction="DIRECTION_ALL"
          onPanStart={this.handlePanStart}
          onPan={this.handlePanMove}
          onPanEnd={this.handlePanEnd}
          onPanCancel={this.handlePanCancel}
        >
          <Pointable
            onPointerEnter={this.handleEnterDot}
            onPointerLeave={this.handleLeaveDot}
            touchAction="none"
          >
            <AnimateDotTop
              color={color}
              diam={20}
              isBounce={isBounce}
              isClear={isClear}
            />
          </Pointable>
        </Hammer>
        <AnimateDotBottom color={color} isActive={isActive} diam={20} />

        {/* TODO: lines could move to Matrix Component */}
        {isPanning &&
          !rectangle && (
            <Line
              width={lineLength}
              height={lineHeight}
              color={color}
              deg={lineAngle}
              left={linePosition.x}
              top={linePosition.y}
            />
          )}

        {connectedLines.map((e, i) => (
          <Line
            key={i.toString()}
            width={40}
            height={lineHeight}
            color={e.color}
            deg={e.deg}
            left={e.x}
            top={e.y}
          />
        ))}
      </DotContainer>
    )
  }
}

export default connect(state => ({
  panningDot: state.gameArea.panningDot,
  panDirection: state.gameArea.panDirection,
  linePosition: state.gameArea.linePosition,
  connectedLines: state.gameArea.connectedLines,
  matrix: state.gameArea.matrix,
  rectangle: state.gameArea.rectangle
}))(EnhancedDot)
