import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import GameStart from './GameStart';
import GameSucceed from './GameSucceed';
import GameFail from './GameFail';

ReactModal.setAppElement('#root');

class Modal extends React.Component {
  render() {
    const {
      showStart,
      showSuccess,
      showFailure,
      chances,
      goals,
      level,
      score
    } = this.props;
    if (showStart) {
      return <GameStart chance={chances} goals={goals} level={level} />;
    }
    if (showSuccess) {
      return <GameSucceed level={level} score={score} />;
    }
    if (showFailure) {
      return <GameFail level={level} />;
    }
    return null;
  }
}

export default connect(state => ({
  showStart: state.gameArea.showStart,
  showSuccess: state.gameArea.showSuccess,
  showFailure: state.gameArea.showFailure
}))(Modal);
