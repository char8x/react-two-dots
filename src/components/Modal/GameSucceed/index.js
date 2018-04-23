import React, { Component } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import './index.css';
import gameAreaActions from '../../../store/gamearea/actions';
import gameInfoActions from '../../../store/gameinfo/actions';
import restart from './restart.svg';

const modalStyle = show => ({
  overlay: {
    backgroundColor: 'rgba(68,68,68,0.8)',
    animationName: show ? '' : 'disappear',
    animationDuration: '0.5s',
    animationFillMode: 'forwards'
  },
  content: {
    top: '13vh',
    left: '5vh',
    backgroundColor: '#3C4D5C',

    borderWidth: 0,
    borderRadius: '15px',
    padding: 0,
    paddingTop: '10px',

    width: '300px',
    height: '360px',

    textAlign: 'center',
    overflow: 'hidden',

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

const Restart = styled.input.attrs({
  type: 'image',
  src: restart,
  alt: 'restart'
})`
  width: 30px;
  height: 30px;
`;

class GameSucceed extends Component {
  constructor(props) {
    super();

    this.state = {
      show: true // control style
    };
  }

  // Continue game
  handleContinue = () => {
    const { currentLevel } = this.props;
    const nextlevel = currentLevel.level + 1;
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.gameInfoActions.activeLevel(nextlevel);
      this.props.gameAreaActions.initGame(nextlevel);
      this.props.routerActions.push('/level/' + nextlevel);
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

  // Return game map
  handleReturn = () => {
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      this.props.routerActions.push('/');
    }, 450);
  };

  componentDidMount() {
    this.props.gameInfoActions.saveResult(this.props.score);
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  render() {
    const { level, score, currentLevel, maxLevel, showSuccess } = this.props;
    return (
      <ReactModal
        isOpen={showSuccess}
        shouldCloseOnOverlayClick={false}
        style={modalStyle(this.state.show)}
      >
        <Title>成功</Title>
        <div
          style={{
            backgroundColor: '#EBEBEB',
            height: '65%',
            width: '100%',
            padding: '10px 0',
            textAlign: 'center',
            color: '#525965',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span>愈战愈勇</span>
          <div
            style={{
              margin: '20px',
              width: '150px',
              height: '150px',
              borderStyle: 'inset',
              borderWidth: '10px',
              borderColor: '#455565',
              boxShadow: 'inset 1px 1px 1em 3px #455565'
            }}
          >
            <CountUp
              style={{
                fontSize: '3rem',
                fontWeight: 'lighter'
              }}
              start={0}
              end={score}
              duration={3}
            />
            <hr />
            <span style={{ fontSize: '1.5rem' }}>关卡 {level}</span>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '60px',
            padding: '10px 0',
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
            <Restart onClick={this.handleRestart} />
          </div>
          <Button
            onClick={
              currentLevel.level < maxLevel
                ? this.handleContinue
                : this.handleReturn
            }
          >
            {currentLevel.level < maxLevel ? '继续' : '返回'}
          </Button>
        </div>
      </ReactModal>
    );
  }
}

export default connect(
  state => ({
    showSuccess: state.gameArea.showSuccess,
    currentLevel: state.gameInfo.currentLevel,
    maxLevel: state.gameInfo.maxLevel
  }),
  dispatch => ({
    gameAreaActions: bindActionCreators(gameAreaActions, dispatch),
    gameInfoActions: bindActionCreators(gameInfoActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  })
)(GameSucceed);
