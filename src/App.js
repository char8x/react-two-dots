import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

// import DotMatrix from './components/DotMatrix'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import GameGoal from './components/GameGoal'
import GameArea from './components/GameArea'
import hex2rgb from './utils/hex2rgb'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  position: absolute;

  display: flex;
  flex-direction: column;

  z-index: -10;
  ${props =>
    props.rectangle
      ? `background-color: rgba(${hex2rgb(props.color)},0.3);`
      : ''};
`

class App extends Component {
  render() {
    const {
      chances,
      goals,
      level,
      clearDots,
      score,
      color,
      rectangle
    } = this.props

    return (
      <AppContainer color={color} rectangle={rectangle}>
        <GameGoal chance={chances} goals={goals} level={level} />
        <TopBar chance={chances} goals={goals} />
        <GameArea />
        <BottomBar level={level} clearDots={clearDots} score={score} />
      </AppContainer>
    )
  }
}

export default connect(state => ({
  chances: state.gameArea.chances,
  goals: state.gameArea.goals,
  level: state.gameArea.level,
  score: state.gameArea.score,
  clearDots: state.gameArea.clearDots,
  color: state.gameArea.dotColor,
  rectangle: state.gameArea.rectangle
}))(App)
