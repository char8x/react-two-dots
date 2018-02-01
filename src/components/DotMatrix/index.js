import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Col from '../DotColumn'

const DotMatrix = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

class Matrix extends Component {
  render() {
    const { matrix } = this.props
    return (
      <DotMatrix>
        {matrix.map((e, i) => <Col list={e} key={i} col={i} />)}
      </DotMatrix>
    )
  }
}

export default connect(state => ({
  matrix: state.gameArea.matrix
}))(Matrix)
