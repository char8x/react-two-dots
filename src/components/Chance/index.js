import React, { Component } from 'react'
import styled from 'styled-components'

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

const Text = styled.span`
  color: #7d848f;
  font-size: ${props => props.fontSize};

  width: 50px;
  height: ${props => props.height};
  margin-top: ${props => props.marginTop};

  text-align: center;

  display: block;
`

class Chance extends Component {
  render() {
    const { chance } = this.props

    return (
      <ChanceBackground>
        <Text height="30px" fontSize="2rem">
          {chance}
        </Text>
        <Text height="10px" fontSize="0.5rem" marginTop="5px">
          次移动机会
        </Text>
      </ChanceBackground>
    )
  }
}

export default Chance
