import styled from 'styled-components'

export default styled.span.attrs({
  style: ({ fontSize, lineHeight }) => ({
    fontSize,
    lineHeight
  })
})`
  color: #7d848f;
  width: 50px;
  text-align: center;
  display: block;
`
