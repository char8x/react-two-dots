import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import _throttle from 'lodash/throttle'

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

  height: 40px;
  width: 40px;
  margin: 15px;

  overflow: hidden;
  box-shadow: none;
  user-select: none;
`

const AnimateDot = Dot.extend`
  position: relative;
  top: -55px;
  z-index: -1;
  animation-duration: 0.65s;
  animation-fill-mode: both;
  ${props => (props.isActive ? `animation-name: ${clickWave};` : '')};
`

const DotContainer = styled.div`
  height: 70px;
`

export default class EnhancedDot extends PureComponent {
  state = {
    isActive: false
  }

  handleClick = () => {
    this.setState({ isActive: !this.state.isActive })
    setTimeout(() => {
      this.setState({ isActive: !this.state.isActive })
    }, 650) // equal or more than animation-duration (0.65s)
  }

  render() {
    const { color } = this.props
    const { isActive } = this.state
    return (
      <DotContainer>
        <Dot color={color} onClick={this.handleClick} />
        <AnimateDot color={color} isActive={isActive} />
      </DotContainer>
    )
  }
}
