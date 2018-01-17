import React from 'react'
import styled from 'styled-components'

import { Dot } from '../Dot'

const GoalNumber = styled.div`
  color: #455361;
  font-size: 0.5rem;
  font-weight: bold;

  text-align: center;
`

const DotGoal = props => (
  <div>
    <Dot color={props.color} radius={10} style={{ marginBottom: '5px' }} />
    <GoalNumber>
      {props.clear} / {props.goal}
    </GoalNumber>
  </div>
)

const Goal = props => (
  <div className={props.className}>
    {props.dots.map((e, i) => (
      <DotGoal
        key={i.toString()}
        color={e.color}
        clear={e.clear}
        goal={e.goal}
      />
    ))}
  </div>
)

const GoalContainer = styled(Goal)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export default GoalContainer
