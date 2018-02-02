import React, { Component } from 'react'
import styled from 'styled-components'
import Dot from '../Dot'
import { DOT_TYPE_DOT, DOT_TYPE_EMPTY } from '../../utils/constants'

// important flex-direction: column-reverse
const DotCol = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

export default class Col extends Component {
  render() {
    const { list, col } = this.props
    return (
      <DotCol>
        {list.map((e, i) => {
          switch (e.type) {
            case DOT_TYPE_DOT:
              return <Dot {...e} key={i} col={col} row={i} />
            default:
              return ''
          }
        })}
      </DotCol>
    )
  }
}
