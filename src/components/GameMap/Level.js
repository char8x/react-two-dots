import React, { Component } from 'react';
import styled from 'styled-components';

import { COLOR_BLUE, COLOR_RED } from '../../utils/constants';

const StyledLevel = styled.div`
  width: 40px;
  height: 40px;

  border: 5px solid;
  border-radius: 40px;
  border-color: ${({ active, enter }) =>
    active && enter ? COLOR_BLUE : active ? COLOR_RED : '#d1d2d6'};

  margin: 5px;
  text-align: center;
  line-height: 40px;
  font-size: 25px;

  color: ${({ active, enter }) =>
    active && enter ? COLOR_BLUE : active ? COLOR_RED : '#d1d2d6'};

  ${props =>
    props.active &&
    `&:hover {
    border-color: ${COLOR_BLUE};
    color: ${COLOR_BLUE};
    cursor: pointer;
  }`};
`;

export default class Level extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enter: false
    };
  }

  render() {
    const { active, onClick, children, ...prop } = this.props;
    return (
      <StyledLevel
        {...prop}
        active={active}
        enter={this.state.enter}
        onClick={e => {
          if (active) {
            this.setState(prevState => ({
              enter: !prevState.enter
            }));
            onClick(e);
          }
        }}
      >
        {children}
      </StyledLevel>
    );
  }
}
