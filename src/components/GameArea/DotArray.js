import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../store/gamearea/actions';
import { DOT_TYPE_DOT } from '../../utils/constants';
import Dot from '../Dot';

const DotArray = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const EmptyDot = () => <div style={{ width: '40px', height: '40px' }} />;

class Matrix extends Component {
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
    const { array } = this.props;
    return (
      <DotArray>
        {array.map((e, i) => {
          switch (e.type) {
            case DOT_TYPE_DOT:
              return (
                <Dot
                  {...e}
                  key={i}
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
  boardWidth: state.gameArea.boardWidth
}))(Matrix);
