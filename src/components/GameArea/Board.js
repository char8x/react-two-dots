import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DotList from './DotList';
import Lines, { FIXED_LINE_HEIGHT } from '../Line/Lines';
import { offset, shape, distance, angle } from '../../utils/dom';
import { isAdjacent, isOppositeDirection } from '../../models/board';
import hammerDirection from '../../utils/hammerjs-direction';
import { DIRECTION_NONE } from '../../utils/constants';
import gameAreaActions from '../../store/gamearea/actions';

const BoardWrapper = styled.div``;

const initState = {
  lineLength: 0,
  lineAngle: 0,
  linePosition: {
    x: 0,
    y: 0
  },
  connectedDots: [],
  connectedLines: [],
  panningDot: -1,
  panDirection: null,
  bounceStartDots: [] // col start bounce dot
};

class Board extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    boardHeight: PropTypes.number.isRequired,
    rectangle: PropTypes.bool,
    color: PropTypes.string
  };
  // required props dont need default value
  static defaultProps = {
    rectangle: false,
    color: ''
  };

  constructor(props) {
    super(props);

    this.state = initState;
  }

  handlePanStart = (e, { idx }) => {
    // debugger
    if (this.state.panningDot === -1) {
      // calculate line start position
      const dotPosition = offset(e.target);
      const dotShape = shape(e.target);
      // 60 means topBar height
      this.setState({
        panningDot: idx,
        connectedDots: [idx],
        linePosition: {
          x: dotPosition.left + dotShape.width / 2,
          y: dotPosition.top + dotShape.height / 2 - FIXED_LINE_HEIGHT / 2
        }
      });
      this.props.gameAreaActions.panningStart(this.props.data[idx].color);
    }
  };

  handlePan = e => {
    const { panDirection, linePosition } = this.state;

    // calculate length and rotate
    let pointer = {
      x: e.center.x,
      y: e.center.y
    };
    this.setState({
      lineLength: distance(
        linePosition.x,
        linePosition.y,
        pointer.x,
        pointer.y
      ),
      lineAngle: angle(linePosition.x, linePosition.y, pointer.x, pointer.y)
    });

    // TODO: how to ensure accurate and just trigger once ?
    if (
      hammerDirection[e.direction] !== DIRECTION_NONE &&
      panDirection !== hammerDirection[e.direction]
    ) {
      this.setState({
        panDirection: hammerDirection[e.direction]
      });
    }
  };

  handlePanEnd = () => {
    const { gameAreaActions } = this.props;
    const { connectedDots } = this.state;
    if (connectedDots.length > 1) {
      // remove dots
      gameAreaActions.beforePanningEnd(connectedDots);
      gameAreaActions.resetDotState('isClear'); // important
    }
    // if no dots connected, clear global state
    this.setState(initState);
  };

  // TODO:
  handleEnterDot = (e, { idx }) => {
    const { data, boardHeight, gameAreaActions, rectangle } = this.props;
    const { panningDot } = this.state;
    if (rectangle) {
      return;
    }
    if (panningDot !== -1 && panningDot !== idx) {
      if (isAdjacent(data, boardHeight)(panningDot, idx).adjacent) {
        this.handleTap();
      }
      // recalculate line start position
      const dotPosition = offset(e.target);
      const dotShape = shape(e.target);
      gameAreaActions.enterDot(idx, {
        x: dotPosition.left + dotShape.width / 2,
        y: dotPosition.top + dotShape.height / 2 - FIXED_LINE_HEIGHT / 2
      });
      gameAreaActions.resetDotState('isActive'); // important
    }
  };

  handleLeaveDot = (e, { idx }) => {
    const { gameAreaActions } = this.props;

    const { panningDot, panDirection, connectedLines } = this.state;

    if (
      connectedLines.length > 0 &&
      panningDot !== -1 &&
      panningDot === idx &&
      isOppositeDirection(
        panDirection,
        connectedLines[connectedLines.length - 1].direction
      )
    ) {
      // leave dot for the opposite direction
      this.setState(preState => {
        const dots = preState.connectedDots;
        const lines = preState.connectedLines;
        const lastLine = lines.pop();
        return {
          connectedDots: dots.slice(0, dots.length - 2),
          connectedLines: lines.slice(0, lines.length - 2),
          panningDot: dots[dots.length - 2],
          linePosition: { x: lastLine.x, y: lastLine.y }
        };
      });
      gameAreaActions.leaveDot(idx);
    }
  };

  render() {
    const { data, boardHeight, rectangle, color } = this.props;
    return (
      <BoardWrapper>
        <DotList
          data={data}
          boardHeight={boardHeight}
          onPanStart={this.handlePanStart}
          onPan={this.handlePan}
          // onPanEnd={this.handlePanEnd}
          // onPanCancel={this.handlePanEnd}
          onEnter={this.handleEnterDot}
          onLeave={this.handleLeaveDot}
        />
        <Lines {...this.state} rectangle={rectangle} color={color} />
      </BoardWrapper>
    );
  }
}

export default connect(
  state => ({
    color: state.gameArea.dotColor,
    rectangle: state.gameArea.rectangle
  }),
  dispatch => ({
    gameAreaActions: bindActionCreators(gameAreaActions, dispatch)
  })
)(Board);
