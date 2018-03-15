import React, { Component } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'

import Goal from '../Goal'
import './index.css'
import actions from '../../store/gamearea/actions'

ReactModal.setAppElement('#root')
const modalStyle = show => ({
  overlay: {
    backgroundColor: 'rgba(68,68,68,0.8)'
  },
  content: {
    top: '25%',
    left: '15%',
    backgroundColor: '#3C4D5C',

    borderWidth: 0,
    borderRadius: '15px',
    padding: 0,
    paddingTop: '10px',

    height: '240px',
    width: '70%',

    textAlign: 'center',
    overflow: 'hidden',

    animationName: show ? 'moveFromTop' : 'moveToBottom',
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

  width: 80%;
  height: 40px;

  border-width: 0;
  border-radius: 20px;
`

class GameStart extends Component {
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
    const { level, goals, chance } = this.props
    return (
      <ReactModal
        isOpen={this.state.open}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.handleModalClose}
        style={modalStyle(this.state.show)}
      >
        <Title>关卡 {level}</Title>
        <div
          style={{
            backgroundColor: '#EBEBEB',
            width: '100%',
            margin: '10px 0',
            padding: '10px 0',
            textAlign: 'center'
          }}
        >
          <span>目标</span>
          <Goal goals={goals} style={{ marginBottom: '10px' }} />
          <span style={{ color: 'grey' }}>移动次数仅限 {chance} 步内</span>
        </div>
        <Button onClick={this.handleModalClose}>开始关卡</Button>
      </ReactModal>
    )
  }
}

export default connect()(GameStart)
