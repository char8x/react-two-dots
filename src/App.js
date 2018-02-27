import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

// import DotMatrix from './components/DotMatrix'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import GameGoal from './components/GameGoal'
import GameArea from './components/GameArea'
import { StyledVerticalProgress as Progress } from './components/ProgressBar'

import { COLOR_BLUE } from './utils/constants'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  position: absolute;

  display: flex;
  flex-direction: column;
`

class App extends Component {
  render() {
    const { chances, goals, level, clearDots, score } = this.props

    return (
      <AppContainer>
        <GameGoal chance={chances} goals={goals} level={level} />
        <TopBar chance={chances} goals={goals} />
        <GameArea />
        <BottomBar level={level} clearDots={clearDots} score={score} />

        {/* <div style={{ height: '100%' }}>
          <Progress color={COLOR_BLUE} progress={1} />
        </div> */}
      </AppContainer>
    )
  }
}

export default connect(state => ({
  chances: state.gameArea.chances,
  goals: state.gameArea.goals,
  level: state.gameArea.level,
  score: state.gameArea.score,
  clearDots: state.gameArea.clearDots
}))(App)
