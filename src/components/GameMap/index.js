import React, { Component } from 'react'
import styled from 'styled-components'

import TopBar from '../TopBar'
import BottomBar from '../BottomBar'
import Level from './Level'

import {
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_YELLOW
} from '../../utils/constants'
import levels from '../../models/levels'

// const levels = Array.from({ length: 10 }).map((e, i) => ({
//   level: i + 1,
//   chance: 20,
//   goals: [
//     {
//       color: COLOR_BLUE,
//       goal: 15
//     },
//     {
//       color: COLOR_PURPLE,
//       goal: 15
//     },
//     {
//       color: COLOR_RED,
//       goal: 15
//     },
//     {
//       color: COLOR_YELLOW,
//       goal: 15
//     }
//   ],
//   score: 0,
//   active: true
// }))

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

export default class GameMap extends Component {
  handleClick = (e, level) => {
    // TODO: dynamic load GameArea
    console.log(level)
  }

  render() {
    return (
      <AppContainer>
        <TopBar />
        <Content>
          <section>
            <Title color={COLOR_RED}>Two</Title>
            <Title color={COLOR_BLUE}>Dots</Title>
          </section>
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
            {levels.map((level, i) => (
              <Level
                key={i.toString()}
                onClick={e => {
                  this.handleClick(e, level)
                }}
                active={level.active}
              >
                {level.level}
              </Level>
            ))}
          </section>
        </Content>
        <BottomBar />
      </AppContainer>
    )
  }
}
