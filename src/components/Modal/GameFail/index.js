import React, { Component } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import './index.css';
import gameAreaActions from '../../../store/gamearea/actions';
import map from './map.svg';
import sad from './sad.svg';

const modalStyle = show => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(68,68,68,0.8)',
    animationName: show ? '' : 'disappear',
    animationDuration: '0.5s',
    animationFillMode: 'forwards'
  },
  content: {
    position: 'absolute',
    boxSizing: 'border-box',
    top: '15vh',
    left: '9vw',
    backgroundColor: '#3C4D5C',

    borderWidth: 0,
    borderRadius: '15px',
    padding: 0,
    paddingTop: '10px',

    width: '300px',
    height: '300px',

    textAlign: 'center',
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    animationName: show ? 'moveFromRight' : 'moveToRight',
    animationDuration: '0.5s',
    animationFillMode: 'forwards'
  }
});

const Title = styled.span`
  color: white;
  font-size: 1.5rem;

  margin: 10px;
`;

const Button = styled.button`
  margin: 5px;

  color: white;
  font-size: 1rem;

  background-color: #6cb98d;

  width: 60%;
  height: 40px;

  border-width: 0;
  border-radius: 20px;
`;

const Map = styled.input.attrs({
  type: 'image',
  src: map,
  alt: 'map'
})`
  width: 30px;
  height: 30px;
`;

const Sad = styled.img.attrs({
  src: sad,
  alt: 'sad'
})`
  width: 100px;
  height: 100px;
  margin: 10px;
`;

class GameFail extends Component {
  constructor(props) {
    super();

    this.state = {
      show: true
    };
  }

  // Return game map
  handleReturn = () => {
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      this.props.routerActions.push('/');
    }, 450);
  };

  // Restart game
  handleRestart = () => {
    const { currentLevel } = this.props;
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.gameAreaActions.initGame(currentLevel.level, currentLevel);
    }, 450);
  };

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  render() {
    const { level, showFailure } = this.props;
    return (
      <ReactModal
        isOpen={showFailure}
        shouldCloseOnOverlayClick={false}
        style={modalStyle(this.state.show)}
      >
        <Title>第 {level} 关挑战失败</Title>
        <div
          style={{
            backgroundColor: '#EBEBEB',
            height: '150px',
            width: '100%',
            padding: '10px 0',
            textAlign: 'center',
            color: '#525965',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Sad />
          <span>别灰心，失败是成功之母</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '60px',
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '100%',
              display: 'inline-block',
              paddingTop: '10px'
            }}
          >
            <Map onClick={this.handleReturn} />
          </div>
          <Button onClick={this.handleRestart}>再玩一次</Button>
        </div>
      </ReactModal>
    );
  }
}

export default connect(
  state => ({
    currentLevel: state.gameInfo.currentLevel,
    showFailure: state.gameArea.showFailure
  }),
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
    gameAreaActions: bindActionCreators(gameAreaActions, dispatch)
  })
)(GameFail);
