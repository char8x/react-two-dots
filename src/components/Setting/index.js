import React, { PureComponent } from 'react'
import styled from 'styled-components'
import setting from './setting.svg'

const Setting = styled.input.attrs({
  type: 'image',
  src: setting,
  alt: 'setting'
})`
  width: 30px;
  height: 30px;
`

const SettingBackground = styled.div`
  background-color: #d7d8db;

  width: 60px;
  height: 100%;

  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default class EnhancedSetting extends PureComponent {
  handleClick = () => {
    console.log('setting')
  }

  render() {
    return (
      <SettingBackground>
        <Setting onClick={this.handleClick} />
      </SettingBackground>
    )
  }
}
