import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import Dot from '../Dot'

const DotCol = styled.div`
  display: flex;
  flex-direction: column;
`

export default class Col extends PureComponent {
  render() {
    const { list } = this.props
    return <DotCol>{list.map((e, i) => <Dot key={i} color={e} />)}</DotCol>
  }
}
