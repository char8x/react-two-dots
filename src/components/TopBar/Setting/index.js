import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import setting from '../../../resources/img/setting.svg';
import triggerAudioEffect from '../../../utils/trigger-audio-effect';

const Setting = styled.input.attrs({
  type: 'image',
  src: setting,
  alt: 'setting',
})`
  width: 30px;
  height: 30px;
  outline: 0;
`;

const SettingBackground = styled.div`
  background-color: #d7d8db;

  width: 60px;
  height: 60px;

  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

class EnhancedSetting extends Component {
  handleClick = () => {
    if (this.props.audioEffect) {
      triggerAudioEffect('click');
    }
  };

  render() {
    return (
      <SettingBackground>
        <Setting
          onClick={e => {
            this.props.onClickSetting && this.props.onClickSetting();
            this.handleClick();
          }}
        />
      </SettingBackground>
    );
  }
}

export default connect(state => ({
  audioEffect: state.gameInfo.audioEffect,
}))(EnhancedSetting);
