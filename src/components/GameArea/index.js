// Level 7 best for test progress bar
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { VerticalProgress, HorizonProgress } from '../ProgressBar'
import DotMatrix from '../DotMatrix'

class GameArea extends Component {
  render() {
    const { matrix, color, rectangle } = this.props
    let { progress } = this.props
    if (rectangle) {
      // fullfill all progress
      progress = 12
    }

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
