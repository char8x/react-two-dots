import 'pepjs' // Pointer Events Polyfill https://github.com/jquery/PEP
import Hammer from 'rc-hammerjs' // http://hammerjs.github.io/api/
import Pointable from 'react-pointable' // https://github.com/MilllerTime/react-pointable
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
// import _debounce from 'lodash/debounce'

import Line from '../Line'
import { offset, shape, distance, angle } from '../../utils/dom'
import actions from '../../store/gamearea/actions'
import hammerDirection from '../../utils/hammerjs-direction'
import _debug from '../../utils/debug'

const eventDebugger = _debug('rtd:event')

// click wave effect
const clickWave = keyframes`
  0% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1,1);
    filter: blur(0px);
  }

  100% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(3,3);
    filter: blur(2px);
  }
`

export const Dot = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  cursor: pointer;

  ${props => {
    return `height: ${props.radius * 2}px;
    width: ${props.radius * 2}px;`
  }} overflow: hidden;
  box-shadow: none;
`

const AnimateDot = Dot.extend`
  position: relative;
  top: -40px;
  z-index: -1;
  animation-duration: 0.65s;
  animation-fill-mode: both;
  ${props => (props.isActive ? `animation-name: ${clickWave};` : '')};
`

const DotContainer = styled.div`
  height: 40px;
  margin: 15px;
`

class EnhancedDot extends Component {
  state = {
    isActive: false, // click wave effect
    isPanning: false, // ensure only one dot is drawing line
    lineLength: 40,
    lineHeight: 10,
    lineAngle: 0
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
    this.setState({ isActive: !this.state.isActive })
    setTimeout(() => {
      this.setState({ isActive: !this.state.isActive })
    }, 650) // equal or more than animation-duration (0.65s)
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

    if (panDirection !== hammerDirection[e.offsetDirection]) {
      dispatch(actions.panning(hammerDirection[e.offsetDirection]))
    }
  }

  handlePanEnd = () => {
    const { dispatch } = this.props
    dispatch(actions.panningEnd())
    eventDebugger('handlePanEnd')
    this.initState()
  }

  handlePanCancel = () => {
    const { dispatch } = this.props
    dispatch(actions.panningEnd())
    eventDebugger('handlePanCancel')
    this.initState()
  }

  handleEnterDot = e => {
    const { panningDot, col, row, dispatch } = this.props
    if (
      panningDot !== null &&
      !(panningDot.col === col && panningDot.row === row)
    ) {
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

  render() {
    // col,row is for dot matrix position
    const { color, col, row, connectedLines, linePosition } = this.props
    const {
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
            <Dot color={color} radius={20} />
          </Pointable>
        </Hammer>
        <AnimateDot color={color} isActive={isActive} radius={20} />
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
            width={80}
            height={lineHeight}
            color={color}
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
  connectedLines: state.gameArea.connectedLines
}))(EnhancedDot)
