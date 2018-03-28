import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import TopBar from '../TopBar';
import BottomBar from '../BottomBar';
import Modal from '../Modal';
import GameArea from '../GameArea';
import hex2rgb from '../../utils/hex2rgb';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  position: absolute;

  display: flex;
  flex-direction: column;

  z-index: -10;
  ${props =>
    props.rectangle
      ? `background-color: rgba(${hex2rgb(props.color)},0.3);`
      : ''};
`;

class App extends Component {
  componentDidMount() {
    this.targetElement = document.querySelector('#root');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    const {
      chances,
      goals,
      level,
      clearDots,
      score,
      color,
      rectangle
    } = this.props;

    if (goals == null || goals.length === 0) {
      return <Redirect to="/" />;
    }

    return (
      <AppContainer color={color} rectangle={rectangle}>
        <Modal chances={chances} goals={goals} level={level} score={score} />
        <TopBar chance={chances} goals={goals} />
        <GameArea />
        <BottomBar level={level} clearDots={clearDots} score={score} />
      </AppContainer>
    );
  }
}

export default connect(state => ({
  chances: state.gameArea.chances,
  goals: state.gameArea.goals,
  level: state.gameArea.level,
  score: state.gameArea.score,
  clearDots: state.gameArea.clearDots,
  color: state.gameArea.dotColor,
  rectangle: state.gameArea.rectangle,
  showSuccess: state.gameArea.showSuccess,
  showFailure: state.gameArea.showFailure
}))(App);
