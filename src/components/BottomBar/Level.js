import React, { Component } from 'react'
import styled from 'styled-components'

import Text from '../Text'

const LevelBackground = styled.div`
  background-color: #d7d8db;

  width: 60px;
  height: 100%;

  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class Chance extends Component {
  render() {
    const { clearDots, level } = this.props

    return (
      <LevelBackground>
        <Text fontSize="2rem" lineHeight="2rem">
          {clearDots}
        </Text>
        <Text fontSize="0.5rem">{level && 'LV ' + level}</Text>
      </LevelBackground>
    )
  }
}

export default Chance
