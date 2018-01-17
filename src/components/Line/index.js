/**
 * Inspire by https://codepen.io/daveboling/pen/jWOorz
 */
import React from 'react'
import styled from 'styled-components'

const lineDistance = (x, y, x0, y0) => {
  return Math.sqrt((x -= x0) * x + (y -= y0) * y)
}

export default styled.div`
  position: relative;

  width: ${props => props.width};
  height: 20px;
  z-index: -1;

  background-color: ${props => props.color};
`
