import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../Text';

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
`;

const LevelText = styled.span.attrs({
  style: ({ fontSize, lineHeight, chance }) => ({
    color: chance < 6 ? '#FF0000' : '#7d848f'
  })
})`
  font-size: 12px;
  font-weight: bold;
  width: 60px;
  text-align: center;
  display: block;

  @media only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (min-resolution: 2dppx) {
    font-size: 10px;
  }
`;

class Chance extends Component {
  render() {
    const { clearDots, level } = this.props;

    return (
      <LevelBackground>
        <Text fontSize="32px" lineHeight="32px">
          {clearDots}
        </Text>
        <LevelText>{level && 'LV ' + level}</LevelText>
      </LevelBackground>
    );
  }
}

export default Chance;
