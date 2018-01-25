import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import Hammer from 'rc-hammerjs'
// import _throttle from 'lodash/throttle'

import Line from '../Line'
import { offset, shape, distance, angle } from '../../utils/dom'

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

const Dot = styled.div`
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

class EnhancedDot extends PureComponent {
  state = {
    isActive: false,
    isConnected: false,
    isPanning: false,
    lineLength: 40,
    lineHeight: 10,
    lineAngle: 0,
    top: 0,
    left: 0
  }

  handleTap = () => {
    this.setState({ isActive: !this.state.isActive })
    setTimeout(() => {
      this.setState({ isActive: !this.state.isActive })
    }, 650) // equal or more than animation-duration (0.65s)
  }

  handlePanStart = e => {
    // calculate line start position
    const dotPosition = offset(e.target)
    const dotShape = shape(e.target)
    const pos = {
      top: dotPosition.top + dotShape.height / 2 - this.state.lineHeight / 2,
      left: dotPosition.left + dotShape.width / 2
    }
    this.setState({
      isPanning: !this.state.isPanning,
      ...pos
    })
    this.handleTap()
  }

  handlePanMove = e => {
    // calculate length and rotate
    let pointer = {
      x: e.center.x,
      y: e.center.y
    }
    this.setState({
      lineLength: distance(
        this.state.left,
        this.state.top,
        pointer.x,
        pointer.y
      ),
      lineAngle: angle(this.state.left, this.state.top, pointer.x, pointer.y)
    })
  }

  handlePanEnd = () => {
    this.setState({ isPanning: !this.state.isPanning })
  }

  handlePanCancel = () => {
    this.setState({ isPanning: !this.state.isPanning })
  }

  render() {
    const { color } = this.props
    const {
      isActive,
      isPanning,
      lineLength,
      lineHeight,
      lineAngle,
      top,
      left
    } = this.state
    return (
      <DotContainer>
        <Hammer
          onTap={this.handleTap}
          direction="DIRECTION_ALL"
          onPanStart={this.handlePanStart}
          onPanEnd={this.handlePanEnd}
          onPan={this.handlePanMove}
          onPanCancel={this.handlePanCancel}
        >
          <Dot color={color} radius={20} />
        </Hammer>
        <AnimateDot color={color} isActive={isActive} radius={20} />
        {isPanning && (
          <Line
            width={lineLength}
            height={lineHeight}
            color={color}
            deg={lineAngle}
            top={top}
            left={left}
          />
        )}
      </DotContainer>
    )
  }
}

export { EnhancedDot as default, Dot }
