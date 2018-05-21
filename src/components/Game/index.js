import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import TopBar from '../TopBar';
import BottomBar from '../BottomBar';
import Modal from '../Modal';
import GameArea from '../GameArea';
import gameInfoActions from '../../store/gameinfo/actions';
import hex2rgb from '../../utils/hex2rgb';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  display: flex;
  flex-direction: column;

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

  handleClickSetting = () => {
    this.props.gameInfoActions.toggleSetting();
  };

  render() {
    const {
      chances,
      goals,
      level,
      clearDots,
      score,
      color,
      rectangle,
    } = this.props;

    if (goals == null || goals.length === 0) {
      return <Redirect to="/" />;
    }

    return (
      <AppContainer color={color} rectangle={rectangle}>
        <Modal
          chances={chances}
          goals={goals}
          level={level}
          score={score}
          showStart={this.props.showStart}
          showSuccess={this.props.showSuccess}
          showFailure={this.props.showFailure}
          showSetting={this.props.showSetting}
          maxLevel={this.props.maxLevel}
        />
        <TopBar
          chance={chances}
          goals={goals}
          onClickSetting={this.handleClickSetting}
        />
        <GameArea
          showBoard={this.props.showBoard}
          data={this.props.data}
          boardHeight={this.props.boardHeight}
          color={color}
          rectangle={rectangle}
        />
        <BottomBar level={level} clearDots={clearDots} score={score} />
      </AppContainer>
    );
  }
}

export default connect(
  state => ({
    chances: state.gameArea.chances,
    goals: state.gameArea.goals,
    level: state.gameArea.level,
    score: state.gameArea.score,
    clearDots: state.gameArea.clearDots,
    color: state.gameArea.dotColor,
    rectangle: state.gameArea.rectangle,
    showBoard: state.gameArea.showBoard,
    data: state.gameArea.array,
    boardHeight: state.gameArea.boardHeight,
    showStart: state.gameArea.showStart,
    showSuccess: state.gameArea.showSuccess,
    showFailure: state.gameArea.showFailure,
    showSetting: state.gameInfo.showSetting,
    maxLevel: state.gameInfo.maxLevel,
  }),
  dispatch => ({
    gameInfoActions: bindActionCreators(gameInfoActions, dispatch),
  })
)(App);
