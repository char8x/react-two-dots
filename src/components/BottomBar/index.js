import React from 'react'
import styled from 'styled-components'

import Score from '../Score'
import Level from '../Level'

const Background = styled.div`
  background-color: #f0f0f1;

  width: 100%;
  height: 60px;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TopBar = props => (
  <Background>
    <Score score={props.score} />
    <Level level={props.level} clearDots={props.clearDots} />
  </Background>
)

export default TopBar
