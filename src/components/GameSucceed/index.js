import React, { Component } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

import './index.css'
import actions from '../../store/gamearea/actions'
import restart from './restart.svg'

ReactModal.setAppElement('#root')
const modalStyle = show => ({
  overlay: {
    backgroundColor: 'rgba(68,68,68,0.8)'
  },
  content: {
    top: '15%',
    bottom: '35%',
    left: '15%',
    right: '15%',
    backgroundColor: '#3C4D5C',

    borderWidth: 0,
    borderRadius: '15px',
    padding: 0,
    paddingTop: '10px',

    height: '50%',
    width: '70%',

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
      show: true,
      open: true
    }
  }

  handleModalClose = () => {
    this.setState({ show: false })
    this.closeTimer = setTimeout(() => {
      this.setState({ open: false })
      // request GameArea component load
      this.props.dispatch(actions.showMatrix())
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer)
  }

  render() {
    const { level, score } = this.props
    return (
      <ReactModal
        isOpen={this.state.open}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.handleModalClose}
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
            padding: '20px 0',
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
            <Restart />
          </div>
          <Button onClick={this.handleModalClose}>继续</Button>
        </div>
      </ReactModal>
    )
  }
}

export default connect()(GameSucceed)
