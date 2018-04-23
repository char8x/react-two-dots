import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import BottomBar from '../BottomBar';
import Level from './Level';
import TopBar from '../TopBar';
import { COLOR_BLUE, COLOR_RED } from '../../utils/constants';
import gameAreaActions from '../../store/gamearea/actions';
import gameInfoActions from '../../store/gameinfo/actions';

const Title = styled.span`
  color: ${props => props.color};

  font-size: 64px;
`;

const Content = styled.main`
  margin: 60px auto;
  height: calc(100vh - 60px - 60px);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppContainer = styled.div``;

class GameMap extends Component {
  componentDidMount() {
    // disable iOS body scroll
    // https://github.com/willmcpo/body-scroll-lock
    this.targetElement = document.querySelector('#root');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    // clear scroll lock
    clearAllBodyScrollLocks();
  }

  handleClick = (e, l) => {
    // dynamic load GameArea
    const { gameInfoActions, gameAreaActions, routerActions } = this.props;
    gameInfoActions.globalInit(l.level);
    gameAreaActions.initGame(l.level);
    routerActions.push('/level/' + l.level);
  };

  render() {
    const { levels } = this.props;

    return (
      <AppContainer>
        <TopBar />
        <Content>
          <header
            style={{
              marginTop: '100px'
            }}
          >
            <Title color={COLOR_RED}>Two</Title>
            <Title color={COLOR_BLUE}>Dots</Title>
          </header>
          <section
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: '50px',
              width: '300px'
            }}
          >
            {levels.map((l, i) => (
              <Level
                key={i.toString()}
                onClick={e => {
                  this.handleClick(e, l);
                }}
                active={l.active}
              >
                {l.level}
              </Level>
            ))}
          </section>
        </Content>
        <BottomBar />
      </AppContainer>
    );
  }
}

export default connect(
  state => ({
    levels: state.gameInfo.levels
  }),
  dispatch => ({
    gameInfoActions: bindActionCreators(gameInfoActions, dispatch),
    gameAreaActions: bindActionCreators(gameAreaActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  })
)(GameMap);
