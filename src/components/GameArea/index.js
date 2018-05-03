// Level 7 best for test progress bar
import React from 'react';
import { connect } from 'react-redux';

import { VerticalProgress, HorizonProgress } from './ProgressBar';
import Board from './Board';

const GameArea = props => {
  const { color, rectangle } = props;
  let { progress } = props;
  if (rectangle) {
    // fullfill all progress
    progress = 12;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        bottom: '60px',
        left: '0px',
        right: '0px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <HorizonProgress progress={progress} color={color} />
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <div>
          <VerticalProgress progress={progress - 6} color={color} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {props.showBoard && (
            <Board
              data={props.data}
              color={color}
              rectangle={rectangle}
              boardHeight={props.boardHeight}
            />
          )}
        </div>
        <div>
          <VerticalProgress progress={progress - 6} color={color} />
        </div>
      </div>
      <HorizonProgress progress={progress} color={color} />
    </div>
  );
};

export default connect(state => ({
  showBoard: state.gameArea.showBoard,
  progress: state.gameArea.progress,
  color: state.gameArea.dotColor,
  rectangle: state.gameArea.rectangle,
  data: state.gameArea.array,
  boardHeight: state.gameArea.boardHeight
}))(GameArea);
