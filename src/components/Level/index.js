import React, { PureComponent } from 'react'
import styled from 'styled-components'

const LevelBackground = styled.div`
  background-color: #d7d8db;

  width: 60px;
  height: 100%;
  margin: 0px;

  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;

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

class Chance extends PureComponent {
  render() {
    const { clearDots, level } = this.props

    return (
      <LevelBackground>
        <Text height="30px" fontSize="2rem">
          {clearDots}
        </Text>
        <Text height="10px" fontSize="0.5rem" marginTop="5px">
          LV {level}
        </Text>
      </LevelBackground>
    )
  }
}

export default Chance
