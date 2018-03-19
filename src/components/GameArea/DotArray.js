import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../store/gamearea/actions';
import { DOT_TYPE_DOT } from '../../utils/constants';
import Dot from '../Dot';

const DotArray = styled.div.attrs({
  style: ({ width, height }) => ({
    width,
    height
  })
})`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const EmptyDot = () => <div style={{ width: '40px', height: '40px' }} />;

class Board extends Component {
  refreshBoard = () => {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer);
    this.refreshTimer = requestAnimationFrame(() => {
      this.props.dispatch(actions.refreshBoard());
      this.props.dispatch(actions.resetDotState('isBounce')); // important
    });
  };

  linePanningEnd = () => {
    if (this.panningEndTimer) cancelAnimationFrame(this.panningEndTimer);
    this.panningEndTimer = requestAnimationFrame(() => {
      this.props.dispatch(actions.panningEnd());
    });
  };

  componentWillUnmount() {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer);
    if (this.panningEndTimer) cancelAnimationFrame(this.panningEndTimer);
  }

  render() {
    const { array, boardHeight, boardWidth } = this.props;
    return (
      <DotArray width={boardWidth * 40} height={boardHeight * 40}>
        {array.map((e, i) => {
          if (e == null) {
            return <EmptyDot key={i.toString()} />;
          }
          switch (e.type) {
            case DOT_TYPE_DOT:
              return (
                <Dot
                  {...e}
                  key={i.toString()}
                  idx={i}
                  refreshBoard={this.refreshBoard}
                  linePanningEnd={this.linePanningEnd}
                />
              );
            default:
              return <EmptyDot />;
          }
        })}
      </DotArray>
    );
  }
}

export default connect(state => ({
  boardHeight: state.gameArea.boardHeight,
  boardWidth: state.gameArea.boardWidth
}))(Board);
