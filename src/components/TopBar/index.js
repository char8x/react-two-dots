import React from 'react'
import styled from 'styled-components'

import Chance from '../Chance'
import Goal from '../Goal'
import Setting from '../Setting'

const Background = styled.div`
  background-color: #f0f0f1;

  width: 100%;
  height: 60px;

  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TopBar = props => (
  <Background>
    <Chance chance={props.chance} />
    <Goal dots={props.dots} />
    <Setting />
  </Background>
)

export default TopBar
