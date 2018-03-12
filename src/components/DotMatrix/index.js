import React, { Component } from 'react'
import styled from 'styled-components'
import Col from '../DotColumn'

const DotMatrix = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
`

export default class Matrix extends Component {
  render() {
    const { matrix } = this.props
    return (
      <DotMatrix>
        {matrix.map((e, i) => <Col list={e} key={i} col={i} />)}
      </DotMatrix>
    )
  }
}
