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
    })
  }

  componentWillUnmount() {
    if (this.refreshTimer) cancelAnimationFrame(this.refreshTimer)
  }

  render() {
    const { matrix } = this.props
    return (
      <DotMatrix>
        {matrix.map((e, i) => (
          <Col list={e} key={i} col={i} refreshMatrix={this.refreshMatrix} />
        ))}
      </DotMatrix>
    )
  }
}

export default connect()(Matrix)
