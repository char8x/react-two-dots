import React, { Component } from 'react'
import styled from 'styled-components'

import Text from '../Text'

const ChanceBackground = styled.div`
  background-color: #d7d8db;

  width: 60px;
  height: 60px;

  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class Chance extends Component {
  render() {
    const { chance } = this.props

    return (
      <ChanceBackground>
        <Text fontSize="2rem" lineHeight="2rem" chance={chance}>
          {chance}
        </Text>
        <Text fontSize="0.4rem">{chance >= 0 && '次移动机会'}</Text>
      </ChanceBackground>
    )
  }
}

export default Chance
