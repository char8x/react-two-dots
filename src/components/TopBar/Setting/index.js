import React, { Component } from 'react';
import styled from 'styled-components';
import setting from '../../../resources/img/setting.svg';

const Setting = styled.input.attrs({
  type: 'image',
  src: setting,
  alt: 'setting',
})`
  width: 30px;
  height: 30px;
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

export default class EnhancedSetting extends Component {
  handleClick = () => {
    console.log('setting');
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
