import 'pepjs' // Pointer Events Polyfill https://github.com/jquery/PEP
import Hammer from 'rc-hammerjs' // http://hammerjs.github.io/api/
import Pointable from 'react-pointable' // https://github.com/MilllerTime/react-pointable
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
// import _debounce from 'lodash/debounce'

import './index.css'
import { bounce, vanish, zoomOut } from '../../utils/animate-keyframes'
import Line from '../Line'
import { offset, shape, distance, angle } from '../../utils/dom'
import { isAdjacent } from '../../utils/data'
import actions from '../../store/gamearea/actions'
import hammerDirection from '../../utils/hammerjs-direction'
import { DIRECTION_NONE, DIRECTION_DOWN } from '../../utils/constants'
import _debug from '../../utils/debug'

const eventDebugger = _debug('rtd:event')

export const Dot = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  cursor: pointer;

  ${props => {
    return `height: ${props.radius * 2}px;
    width: ${props.radius * 2}px;`
  }} overflow: hidden;
  box-shadow: none;

  ${props =>
    props.isBounce
      ? `animation-name: ${bounce};
  transform-origin: center bottom;
  animation-duration: 1s;
  animation-fill-mode: both;`
      : ''};

  ${props =>
    props.isClear
      ? `animation-name: ${zoomOut};
      transform-origin: center;
      animation-duration: 1s;
      animation-fill-mode: both;`
      : ''};
`

const AnimateDot = Dot.extend`
  position: relative;
  top: -40px;
  z-index: -1;

  ${props =>
    props.isActive
      ? `animation-name: ${vanish};
         animation-duration: 0.65s;
         animation-fill-mode: both;`
      : ''};
`

const DotContainer = styled.div`
  height: 40px;
  margin: 15px;
`

class EnhancedDot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isBounce: true,
      isActive: false, // click wave effect
      isClear: false,
      isPanning: false, // ensure only one dot is drawing line
      lineLength: 40,
      lineHeight: 10,
      lineAngle: 0
    }
  }

  initState = () => {
    this.setState({
      isPanning: false,
      lineLength: 40,
      lineHeight: 10,
      lineAngle: 0
    })
  }

  handleTap = () => {
    // let dot only bounce once
    this.setState({ isActive: false, isBounce: false })
    this.setState({ isActive: true })
    this.activeTimer = setTimeout(() => {
      this.setState({ isActive: false })
    }, 650) // equal or more than animation-duration (0.65s)
  }

  handleClear = () => {
    this.setState({ isClear: true })
  }

  handlePanStart = e => {
    const { panningDot, col, row, dispatch } = this.props
    // debugger
    if (panningDot == null) {
      // calculate line start position
      const dotPosition = offset(e.target)
      const dotShape = shape(e.target)
      dispatch(
        actions.panningStart(
          {
            col,
            row
          },
          {
            x: dotPosition.left + dotShape.width / 2,
            y: dotPosition.top + dotShape.height / 2 - this.state.lineHeight / 2
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
    const { dispatch, panDirection, panningDot, linePosition } = this.props
    // console.log(`panningDot ${panningDot.col} ${panningDot.row}`)
    // calculate length and rotate
    let pointer = {
      x: e.center.x,
      y: e.center.y
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
    dispatch(actions.beforePanningEnd())
    dispatch(actions.panningEnd())
    if (connectedLines.length === 0) {
      this.initState()
    }
  }

  handlePanCancel = () => {
    const { connectedLines, dispatch } = this.props
    dispatch(actions.panningEnd())
    eventDebugger('handlePanCancel')
    if (connectedLines.length === 0) {
      this.initState()
    }
  }

  handleEnterDot = e => {
    const { panningDot, col, row, matrix, dispatch } = this.props
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
            y: dotPosition.top + dotShape.height / 2 - this.state.lineHeight / 2
          }
        )
      )
    }
  }

  handleLeaveDot = () => {
    const { panningDot, col, row, dispatch } = this.props
    if (
      panningDot !== null &&
      !(panningDot.col === col && panningDot.row === row)
    ) {
      // eventDebugger(`panningDot ${panningDot} leave dot ${col} ${row}`)
      // dispatch(actions.leaveDot({ col, row }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive) {
      this.handleTap()
      this.props.dispatch(
        actions.resetDotState({
          col: this.props.col,
          row: this.props.row
        })
      )
    } else if (nextProps.isClear) {
      this.handleClear()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.activeTimer)
    // WARN: may be called multiple times,bad performance
    this.props.dispatch(actions.refreshMatrix())
  }

  render() {
    // col,row is for dot matrix position
    const { color, connectedLines, linePosition } = this.props
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
            <Dot
              color={color}
              radius={20}
              isBounce={isBounce}
              isClear={isClear}
            />
          </Pointable>
        </Hammer>
        <AnimateDot
          color={color}
          isActive={isActive}
          radius={20}
          isBounce={isBounce}
          isClear={isClear}
        />

        {isPanning && (
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
            width={80}
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
  matrix: state.gameArea.matrix
}))(EnhancedDot)
