import styled from 'styled-components'

export const Centered = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  ${props => props.color && 'background-color: ' + props.color + ';'}

  ${props => props.vertical && 'justify-content: center;'} ${props =>
  props.horizontal && 'align-items: center;'} 
  flex-direction: column;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems || 'center'};
`
