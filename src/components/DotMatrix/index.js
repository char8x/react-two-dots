import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { matrix } from '../../utils/data'
import Col from '../DotColumn'

const DotMatrix = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default class Matrix extends PureComponent {
  state = {
    matrix
  }

  render() {
    return (
      <DotMatrix>{matrix.map((e, i) => <Col list={e} key={i} />)}</DotMatrix>
    )
  }
}
