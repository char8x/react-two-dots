import React, { Component } from 'react'
import styled from 'styled-components'
import Dot from '../Dot'

const DotCol = styled.div`
  display: flex;
  flex-direction: column;
`

export default class Col extends Component {
  render() {
    const { list, col } = this.props
    return (
      <DotCol>
        {list.map((e, i) => <Dot key={i} color={e} col={col} row={i} />)}
      </DotCol>
    )
  }
}
