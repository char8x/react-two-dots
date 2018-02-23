import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DotMatrix from './components/DotMatrix'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import GameGoal from './components/GameGoal'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  position: absolute;
`

class App extends Component {
  render() {
    const { matrix, chances, goals, level, clearDots, score } = this.props

    return (
      <AppContainer>
        <GameGoal chance={chances} goals={goals} level={level} />
        <TopBar chance={chances} goals={goals} />
        <DotMatrix matrix={matrix} />
        <BottomBar level={level} clearDots={clearDots} score={score} />
      </AppContainer>
    )
  }
}

export default connect(state => ({
  matrix: state.gameArea.matrix,
  chances: state.gameArea.chances,
  goals: state.gameArea.goals,
  level: state.gameArea.level,
  score: state.gameArea.score,
  clearDots: state.gameArea.clearDots
}))(App)
