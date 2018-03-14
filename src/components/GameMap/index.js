import React, { Component } from 'react'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import BottomBar from '../BottomBar'
import Level from './Level'
import TopBar from '../TopBar'
import Loading from '../Loading'
import { COLOR_BLUE, COLOR_RED } from '../../utils/constants'
import actions from '../../store/gamearea/actions'
import levels from '../../models/levels'

const Title = styled.span`
  color: ${props => props.color};

  font-size: 4rem;
`

const Content = styled.div`
  height: 100%;
  width: 100%;

  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  position: absolute;

  display: flex;
  flex-direction: column;

  z-index: -10;
`

class GameMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Game: null
    }
  }

  handleClick = (e, l) => {
    // dynamic load GameArea
    this.props.dispatch(actions.initGame(l.level, l.data()))
    this.setState({
      Game: Loadable({
        loader: () => import('../Game'),
        loading: Loading
      })
    })
  }

  render() {
    const { Game } = this.state
    if (Game !== null) {
      return <Game />
    } else {
      return (
        <AppContainer>
          <TopBar />
          <Content>
            <header>
              <Title color={COLOR_RED}>Two</Title>
              <Title color={COLOR_BLUE}>Dots</Title>
            </header>
            <section
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                marginTop: '50px',
                width: '300px'
              }}
            >
              {levels.map((l, i) => (
                <Level
                  key={i.toString()}
                  onClick={e => {
                    this.handleClick(e, l)
                  }}
                  active={l.active}
                >
                  {l.level}
                </Level>
              ))}
            </section>
          </Content>
          <BottomBar />
        </AppContainer>
      )
    }
  }
}

export default connect()(GameMap)
