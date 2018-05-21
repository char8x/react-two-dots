import React, { Component } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import './index.css';
import gameAreaActions from '../../../store/gamearea/actions';
import gameInfoActions from '../../../store/gameinfo/actions';

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
`;

class GameSetting extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false, // control animate
      open: false, // control display
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showSetting !== prevState.show) {
      if (nextProps.showSetting) {
        return {
          show: true,
          open: true,
        };
      }
      return {
        show: false,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.show !== prevState.show && this.state.show === false) {
      // props.showSetting change --> state.show change
      this.timer = setTimeout(() => {
        this.setState({ open: false });
      }, 450);
      if (this.props.showSetting === true) {
        // state.show change --> props.showSetting change
        this.props.gameInfoActions.toggleSetting();
      }
    }
  }

  componentWillUnmount() {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if (this.timer) clearTimeout(this.timer);
  }

  handleModalClose = () => {
    this.setState({ show: false });
  };

  // Return game map
  handleReturn = () => {
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      this.props.routerActions.push('/');
    }, 450);
  };

  // Restart game
  handleRestart = () => {
    const { level } = this.props;
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.gameAreaActions.initGame(level);
    }, 450);
  };

  // Reset game progress
  handleReset = () => {
    this.setState({ show: false });
    this.closeTimer = setTimeout(() => {
      this.props.gameInfoActions.resetGame();
    }, 450);
  };

  render() {
    const renderButtons = () => {
      const { path } = this.props;
      if (path === '/') {
        return (
          <Button background="#6CB98D" color="#FFF" onClick={this.handleReset}>
            重置游戏进度
          </Button>
        );
      } else if (path.match(/^\/level\//g)) {
        return (
          <React.Fragment>
            <Button
              background="#6CB98D"
              color="#FFF"
              onClick={this.handleRestart}
            >
              重新启动
            </Button>
            <Button background="#FFF" color="#000" onClick={this.handleReturn}>
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
        <div style={{ position: 'absolute', bottom: '20px', fontSize: '10px' }}>
          版本 ID：1.0.0
        </div>
      </ReactModal>
    );
  }
}

export default connect(
  state => ({
    path: state.router.location.pathname,
  }),
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
    gameAreaActions: bindActionCreators(gameAreaActions, dispatch),
    gameInfoActions: bindActionCreators(gameInfoActions, dispatch),
  })
)(GameSetting);
