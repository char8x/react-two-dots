import styled from 'styled-components'

const Line = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;

  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: -2;

  background-color: ${props => props.color};
  transform: rotate(${props => props.deg}deg);
  transform-origin: center left;
`

export default Line
