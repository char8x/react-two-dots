// Level 7 best for test progress bar
import React from 'react';

import { VerticalProgress, HorizonProgress } from './ProgressBar';
import Board from './Board';

class GameArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  handleProgressChange = progress => {
    this.setState({
      progress
    });
  };

  render() {
    const { color } = this.props;
    const { progress } = this.state;

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
            {this.props.showBoard && (
              <Board
                data={this.props.data}
                color={color}
                rectangle={this.props.rectangle}
                boardHeight={this.props.boardHeight}
                onProgressChange={this.handleProgressChange}
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
  }
}
export default GameArea;
