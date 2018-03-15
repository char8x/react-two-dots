import React, { Component } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

import './index.css'
import gameAreaActions from '../../store/gamearea/actions'
import gameInfoActions from '../../store/gameinfo/actions'

import restart from './restart.svg'

ReactModal.setAppElement('#root')
const modalStyle = show => ({
  overlay: {
    backgroundColor: 'rgba(68,68,68,0.8)'
  },
  content: {
    top: '13vh',
    left: '6vh',
    backgroundColor: '#3C4D5C',

    borderWidth: 0,
    borderRadius: '15px',
    padding: 0,
    paddingTop: '10px',

    width: '300px',
    height: '360px',

    textAlign: 'center',
    overflow: 'hidden',

    animationName: show ? 'moveFromRight' : 'moveToRight',
    animationDuration: '0.5s'
  }
})

const Title = styled.span`
  color: white;
  font-size: 1.5rem;

  margin: 10px;
`

const Button = styled.button`
  margin: 5px;

  color: white;
  font-size: 1rem;

  background-color: #6cb98d;

  width: 60%;
  height: 40px;

  border-width: 0;
  border-radius: 20px;
`

const Restart = styled.input.attrs({
  type: 'image',
  src: restart,
  alt: 'restart'
})`
  width: 30px;
  height: 30px;
`

class GameSucceed extends Component {
  constructor(props) {
    super()

    this.state = {
      show: true // control style
    }
  }

  // Continue game
  handleContinue = () => {
    const { currentLevel, levels } = this.props
    const nextlevel = currentLevel.level + 1
    this.setState({ show: false })
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.dispatch(gameInfoActions.activeLevel(nextlevel))
      this.props.dispatch(
        gameAreaActions.initGame(nextlevel, levels[nextlevel - 1].data())
      )
      this.setState({ show: true })
    }, 450)
  }

  // Return game map
  handleReturn = () => {
    this.setState({ show: false })
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      // this.props.dispatch(
      //   actions.initGame(currentLevel.level + 1, currentLevel)
      // )
      this.setState({ show: true })
    }, 450)
  }

  // Restart game
  handleRestart = () => {
    const { currentLevel } = this.props
    this.setState({ show: false })
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.dispatch(
        gameAreaActions.initGame(currentLevel.level, currentLevel)
      )
      this.setState({ show: true })
    }, 450)
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer)
  }

  render() {
    const { level, score, currentLevel, maxLevel, showSuccess } = this.props
    return (
      <ReactModal
        isOpen={showSuccess}
        shouldCloseOnOverlayClick={false}
        style={modalStyle(this.state.show)}
      >
        <Title>成功</Title>
        <div
          style={{
            backgroundColor: '#EBEBEB',
            height: '65%',
            width: '100%',
            padding: '10px 0',
            textAlign: 'center',
            color: '#525965',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span>愈战愈勇</span>
          <div
            style={{
              margin: '20px',
              width: '150px',
              height: '150px',
              borderStyle: 'inset',
              borderWidth: '10px',
              borderColor: '#455565',
              boxShadow: 'inset 1px 1px 1em 3px #455565'
            }}
          >
            <CountUp
              style={{
                fontSize: '3rem',
                fontWeight: 'lighter'
              }}
              start={0}
              end={score}
              duration={4}
            />
            <hr />
            <span style={{ fontSize: '1.5rem' }}>关卡 {level}</span>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '60px',
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '100%',
              display: 'inline-block',
              paddingTop: '10px'
            }}
          >
            <Restart onClick={this.handleRestart} />
          </div>
          <Button
            onClick={
              currentLevel.level < maxLevel
                ? this.handleContinue
                : this.handleReturn
            }
          >
            {currentLevel.level < maxLevel ? '继续' : '返回'}
          </Button>
        </div>
      </ReactModal>
    )
  }
}

export default connect(state => ({
  showSuccess: state.gameArea.showSuccess,
  currentLevel: state.gameInfo.currentLevel,
  maxLevel: state.gameInfo.maxLevel,
  levels: state.gameInfo.levels
}))(GameSucceed)
