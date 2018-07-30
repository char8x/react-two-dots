import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import './index.css';
import gameAreaActions from '../../../store/gamearea/actions';
import gameInfoActions from '../../../store/gameinfo/actions';
import Switch from '../../Switch';

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
    animationFillMode: 'forwards',
  },
  content: {
    position: 'absolute',
    boxSizing: 'border-box',
    top: '60px',
    left: '60px',
    right: 0,
    bottom: 0,
    backgroundColor: '#495866',

    borderWidth: 0,
    padding: 0,
    paddingTop: '10px',

    textAlign: 'center',
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 0,

    animationName: show ? 'moveFromRight' : 'moveToRight',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },
});

const Button = styled.button.attrs({
  style: ({ background, color }) => ({
    background,
    color,
  }),
})`
  width: 200px;
  height: 40px;
  border: 0;
  border-radius: 20px;
  margin: 30px 0;
  outline: 0;
`;

class GameSetting extends Component {
  static propTypes = {
    showSetting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    handleAudioEffect: () => {},
    showSetting: false,
  };

  state = {
    show: false, // control animate
    open: false, // control display
  };

  componentDidUpdate(prevProps, prevState) {
    // debugger;
    if (prevProps.showSetting !== this.props.showSetting) {
      if (this.props.showSetting) {
        this.setState({
          open: true,
          show: true,
        });
      } else {
        this.setState({
          show: false,
        });
        this.timer = setTimeout(() => {
          this.setState({ open: false });
        }, 450);
      }
    }
  }

  componentWillUnmount() {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if (this.timer) clearTimeout(this.timer);
  }

  handleModalClose = () => {
    this.props.gameInfoActions.toggleSetting();
  };

  // Return game map
  handleReturn = () => {
    this.props.gameInfoActions.toggleSetting();
    this.closeTimer = setTimeout(() => {
      this.props.routerActions.push('/');
    }, 450);
  };

  // Restart game
  handleRestart = () => {
    const { level } = this.props;
    this.props.gameInfoActions.toggleSetting();
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.gameAreaActions.initGame(level);
    }, 450);
  };

  // Reset game progress
  handleReset = () => {
    this.props.gameInfoActions.toggleSetting();
    this.closeTimer = setTimeout(() => {
      this.props.gameInfoActions.resetGame();
    }, 450);
  };

  handleToggleMusic = value => {
    this.props.handleAudioEffect();
    this.props.gameInfoActions.toggleMusic();
  };

  handleToggleAudioEffect = value => {
    this.props.handleAudioEffect(value);
    this.props.gameInfoActions.toggleAudioEffect();
  };

  render() {
    const renderButtons = () => {
      const { path } = this.props;
      if (path === '/') {
        return (
          <Button
            background="#6CB98D"
            color="#FFF"
            onClick={e => {
              this.props.handleAudioEffect();
              this.handleReset(e);
            }}
          >
            重置游戏进度
          </Button>
        );
      } else if (path.match(/^\/level\//g)) {
        return (
          <React.Fragment>
            <Button
              background="#6CB98D"
              color="#FFF"
              onClick={e => {
                this.props.handleAudioEffect();
                this.handleRestart(e);
              }}
            >
              重新启动
            </Button>
            <Button
              background="#FFF"
              color="#000"
              onClick={e => {
                this.props.handleAudioEffect();
                this.handleReturn(e);
              }}
            >
              退出至地图
            </Button>
          </React.Fragment>
        );
      }
    };

    return (
      <ReactModal
        isOpen={this.state.open}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.handleModalClose}
        style={modalStyle(this.state.show)}
      >
        <div style={{ height: '100px', width: '100%' }} />
        {renderButtons()}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '200px',
            marginTop: '20px',
          }}
        >
          <Switch
            label={'音乐'}
            checked={this.props.music}
            onChange={this.handleToggleMusic}
          />
          <Switch
            label={'音效'}
            checked={this.props.audioEffect}
            onChange={this.handleToggleAudioEffect}
          />
        </div>
        <div style={{ position: 'absolute', bottom: '20px', fontSize: '10px' }}>
          版本 ID：0.1.0
        </div>
      </ReactModal>
    );
  }
}

export default connect(
  state => ({
    path: state.router.location.pathname,
    music: state.gameInfo.music,
    audioEffect: state.gameInfo.audioEffect,
  }),
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
    gameAreaActions: bindActionCreators(gameAreaActions, dispatch),
    gameInfoActions: bindActionCreators(gameInfoActions, dispatch),
  })
)(GameSetting);
