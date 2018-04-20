import styled from 'styled-components';

export default styled.span.attrs({
  style: ({ fontSize, lineHeight, chance }) => ({
    fontSize,
    lineHeight,
    color: chance < 6 ? '#FF0000' : '#7d848f'
  })
})`
  width: 60px;
  text-align: center;
  display: block;
`;
