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
    <Dot color={props.color} radius={10} style={{ margin: '15px 15px 5px' }} />

    <GoalNumber>
      {props.showClear ? `${props.clear} / ${props.goal}` : props.goal}
    </GoalNumber>
  </div>
)

const Goal = props => (
  <div className={props.className} style={props.style}>
    {props.goals.map((e, i) => (
      <DotGoal
        key={i.toString()}
        color={e.color}
        clear={e.clear}
        goal={e.goal}
        showClear={props.showClear}
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
