import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DotMatrix from './components/DotMatrix'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import {
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW
} from './utils/constants'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  position: absolute;
`

class App extends Component {
  render() {
    const { matrix } = this.props
    const chance = 20
    const score = 0
    const level = 1
    const clearDots = 0
    const dots = [
      {
        color: COLOR_BLUE,
        clear: 0,
        goal: 15
      },
      {
        color: COLOR_PURPLE,
        clear: 0,
        goal: 15
      },
      {
        color: COLOR_RED,
        clear: 0,
        goal: 15
      },
      {
        color: COLOR_YELLOW,
        clear: 0,
        goal: 15
      }
    ]

    return (
      <AppContainer>
        <TopBar chance={chance} dots={dots} />
        <DotMatrix matrix={matrix} />
        <BottomBar level={level} clearDots={clearDots} score={score} />
      </AppContainer>
    )
  }
}

export default connect(state => ({
  matrix: state.gameArea.matrix
}))(App)
