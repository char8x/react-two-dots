import React, { Component } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

import './index.css'
import actions from '../../store/gamearea/actions'
import map from './map.svg'
import sad from './sad.svg'

ReactModal.setAppElement('#root')
const modalStyle = show => ({
  overlay: {
    backgroundColor: 'rgba(68,68,68,0.8)'
  },
  content: {
    top: '15vh',
    left: '6vh',
    backgroundColor: '#3C4D5C',

    borderWidth: 0,
    borderRadius: '15px',
    padding: 0,
    paddingTop: '10px',

    width: '300px',
    height: '400px',

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

const Map = styled.input.attrs({
  type: 'image',
  src: map,
  alt: 'map'
})`
  width: 30px;
  height: 30px;
`

const Sad = styled.img.attrs({
  src: sad,
  alt: 'sad'
})`
  width: 100px;
  height: 100px;
  margin: 10px;
`

class GameSucceed extends Component {
  constructor(props) {
    super()

    this.state = {
      show: true
    }
  }

  handleModalClose = () => {
    this.setState({ show: false })
    this.closeTimer = setTimeout(() => {
      // request GameArea component load
      this.props.dispatch(actions.showMatrix())
      this.setState({ show: true })
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer)
  }

  render() {
    const { level, score, showFailure } = this.props
    return (
      <ReactModal
        isOpen={showFailure}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.handleModalClose}
        style={modalStyle(this.state.show)}
      >
        <Title>第 {level} 关挑战失败</Title>
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
          <Sad />
          <span>别灰心，失败是成功之母</span>
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
            <Map />
          </div>
          <Button onClick={this.handleModalClose}>再玩一次</Button>
        </div>
      </ReactModal>
    )
  }
}

export default connect(state => ({
  showFailure: state.gameArea.showFailure
}))(GameSucceed)
