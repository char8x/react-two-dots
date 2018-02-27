// Level 7 best for test progress bar
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { VerticalProgress, HorizonProgress } from '../ProgressBar'
import DotMatrix from '../DotMatrix'

class GameArea extends Component {
  render() {
    const { matrix, progress, color, rectangleExist } = this.props

    const Container = styled.div`
      height: 100%;
      ${props =>
        props.rectangleExist
          ? `backgroundColor: ${props.color};opacity: 0.3;`
          : ''};
    `

    return (
      <Container rectangleExist={rectangleExist} color={color}>
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
          <div>
            <DotMatrix matrix={matrix} />
          </div>
          <div>
            <VerticalProgress progress={progress - 6} color={color} />
          </div>
        </div>
        <HorizonProgress progress={progress} color={color} />
      </Container>
    )
  }
}

export default connect(state => ({
  matrix: state.gameArea.matrix,
  progress: state.gameArea.connectedLines.length,
  color: state.gameArea.dotColor,
  rectangleExist: state.gameArea.rectangleExist
}))(GameArea)
