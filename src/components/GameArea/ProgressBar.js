import React from 'react'
import styled from 'styled-components'

const Line = styled.div`
  background-color: ${props => props.color};
  width: ${props => props.width + '%'};
  height: ${props => props.height + 'px'};
  transition: width 200ms;
`
const VerticalLine = styled.div`
  background-color: ${props => props.color};
  height: ${props => props.height + '%'};
  width: ${props => props.width + 'px'};
  transition: height 200ms;
`

const ProgressLine = ({ color, progress, direction, ...props }) => {
  const percent = progress <= 5 ? Math.floor(progress * 8.3) : 100
  if (direction === 'horizon') {
    return <Line color={color} width={percent} height={20} />
  } else if (direction === 'vertical') {
    return <VerticalLine color={color} height={percent} width={20} />
  }
  return <div />
}

export const HorizonProgress = ({ color, progress, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '20px'
      }}
    >
      <ProgressLine color={color} progress={progress} direction="horizon" />
      <ProgressLine color={color} progress={progress} direction="horizon" />
    </div>
  )
}

export const VerticalProgress = ({ color, progress, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <ProgressLine color={color} progress={progress} direction="vertical" />
      <ProgressLine color={color} progress={progress} direction="vertical" />
    </div>
  )
}
