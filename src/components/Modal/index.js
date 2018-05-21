import React from 'react';
import ReactModal from 'react-modal';

import GameStart from './GameStart';
import GameSucceed from './GameSucceed';
import GameFail from './GameFail';
import GameSetting from './GameSetting';

ReactModal.setAppElement('#root');
ReactModal.defaultStyles = {};

class Modal extends React.Component {
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
        />
      );
    }
    if (showFailure) {
      return <GameFail showFailure={showFailure} level={level} />;
    }

    return <GameSetting showSetting={showSetting} level={level} />;
  }
}

export default Modal;
