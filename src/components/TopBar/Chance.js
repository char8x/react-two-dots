import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../Text';

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
`;

const ChanceText = styled.span`
  color: #7d848f;
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
    const { chance } = this.props;

    return (
      <ChanceBackground>
        <Text fontSize="32px" lineHeight="32px" chance={chance}>
          {chance}
        </Text>
        <ChanceText>{chance >= 0 && '次移动机会'}</ChanceText>
      </ChanceBackground>
    );
  }
}

export default Chance;
