import React from 'react';
import ReactModal from 'react-modal';

import GameStart from './GameStart';
import GameSucceed from './GameSucceed';
import GameFail from './GameFail';

ReactModal.setAppElement('#root');
ReactModal.defaultStyles = {};

class Modal extends React.Component {
  render() {
    const {
      showStart,
      showSuccess,
      showFailure,
      chances,
      goals,
      level,
      score,
      maxLevel
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
    return null;
  }
}

export default Modal;
