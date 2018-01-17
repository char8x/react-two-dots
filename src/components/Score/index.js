import React, { PureComponent } from 'react'
import styled from 'styled-components'
import star from './star.svg'

const Star = styled.img.attrs({
  src: star,
  alt: 'star'
})`
  width: 30px;
  height: 30px;
`

const ScoreBackground = styled.div`
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
      <ScoreBackground>
        <Star />
      </ScoreBackground>
    )
  }
}
