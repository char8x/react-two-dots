import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import triggerAudioEffect from '../../utils/trigger-audio-effect';
import GameStart from './GameStart';
import GameSucceed from './GameSucceed';
import GameFail from './GameFail';
import GameSetting from './GameSetting';

ReactModal.setAppElement('#root');
ReactModal.defaultStyles = {};

class Modal extends React.Component {
  handleAudioEffect = force => {
    if (force !== undefined && force) {
      triggerAudioEffect('click');
    } else if (force === undefined && this.props.audioEffect) {
      triggerAudioEffect('click');
    }
  };

  render() {
    const {
      showStart,
      showSuccess,
      showFailure,
      showSetting,
      chances,
      goals,
      level,
      score,
      maxLevel,
    } = this.props;
    if (showStart) {
      return (
        <GameStart
          showStart={showStart}
          chance={chances}
          goals={goals}
          level={level}
          handleAudioEffect={this.handleAudioEffect}
        />
      );
    }
    if (showSuccess) {
      return (
        <GameSucceed
          showSuccess={showSuccess}
          level={level}
          score={score}
          maxLevel={maxLevel}
          handleAudioEffect={this.handleAudioEffect}
        />
      );
    }
    if (showFailure) {
      return (
        <GameFail
          showFailure={showFailure}
          level={level}
          handleAudioEffect={this.handleAudioEffect}
        />
      );
    }

    return (
      <GameSetting
        showSetting={showSetting}
        level={level}
        handleAudioEffect={this.handleAudioEffect}
      />
    );
  }
}

export default connect(state => ({
  audioEffect: state.gameInfo.audioEffect,
}))(Modal);
