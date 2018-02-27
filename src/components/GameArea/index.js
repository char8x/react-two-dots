// Level 7 best for test progress bar
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { VerticalProgress, HorizonProgress } from '../ProgressBar'
import DotMatrix from '../DotMatrix'

class GameArea extends Component {
  render() {
    const { matrix, progress, color, rectangle } = this.props

    const Container = styled.div`
      height: 100%;
      background-color: ${props => (props.rectangle ? props.color : '#FFF')};
      opacity: ${props => (props.rectangle ? 0.3 : 1)};
    `
    return (
      <div style={{ height: '100%' }}>
        <HorizonProgress progress={progress} color={color} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <VerticalProgress progress={progress - 6} color={color} />
          </div>
          <DotMatrix matrix={matrix} />
          <div>
            <VerticalProgress progress={progress - 6} color={color} />
          </div>
        </div>
        <HorizonProgress progress={progress} color={color} />
      </div>
    )
  }
}

export default connect(state => ({
  matrix: state.gameArea.matrix,
  progress: state.gameArea.connectedLines.length,
  color: state.gameArea.dotColor,
  rectangle: state.gameArea.rectangle
}))(GameArea)
