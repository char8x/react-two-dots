import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DOT_TYPE_DOT } from '../../utils/constants';
import Dot from '../Dot/Dot';
import gameAreaActions from '../../store/gamearea/actions';

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

class DotList extends React.Component {
  refreshBoard = () => {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer);
    this.refreshTimer = requestAnimationFrame(() => {
      this.props.gameAreaActions.refreshBoard();
      this.props.gameAreaActions.resetDotState('bounce'); // important
    });
  };

  linePanningEnd = () => {
    if (this.panningEndTimer) cancelAnimationFrame(this.panningEndTimer);
    this.panningEndTimer = requestAnimationFrame(() => {
      this.props.gameAreaActions.panningEnd();
    });
  };

  componentWillUnmount() {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer);
    if (this.panningEndTimer) cancelAnimationFrame(this.panningEndTimer);
  }

  render() {
    const { data, boardHeight, ...restProps } = this.props;
    return (
      <DotArray
        width={Math.floor(data.length / boardHeight) * 40}
        height={boardHeight * 40}
      >
        {data.map((e, i) => {
          if (e == null) {
            return <EmptyDot key={i.toString()} />;
          }
          switch (e.type) {
            case DOT_TYPE_DOT:
              return (
                <Dot
                  {...restProps}
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

export default connect(null, dispatch => ({
  gameAreaActions: bindActionCreators(gameAreaActions, dispatch)
}))(DotList);
