import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Col from './DotColumn'
import actions from '../../store/gamearea/actions'

const DotMatrix = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
`

class Matrix extends Component {
  refreshMatrix = () => {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer)
    this.refreshTimer = requestAnimationFrame(() => {
      this.props.dispatch(actions.refreshMatrix())
      this.props.dispatch(actions.resetDotState('isBounce')) // important
    })
  }

  linePanningEnd = () => {
    if (this.panningEndTimer) cancelAnimationFrame(this.panningEndTimer)
    this.panningEndTimer = requestAnimationFrame(() => {
      this.props.dispatch(actions.panningEnd())
    })
  }

  componentWillUnmount() {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer)
    if (this.panningEndTimer) cancelAnimationFrame(this.panningEndTimer)
  }

  render() {
    const { matrix } = this.props
    return (
      <DotMatrix>
        {matrix.map((e, i) => (
          <Col
            list={e}
            key={i}
            col={i}
            refreshMatrix={this.refreshMatrix}
            linePanningEnd={this.linePanningEnd}
          />
        ))}
      </DotMatrix>
    )
  }
}

export default connect()(Matrix)
