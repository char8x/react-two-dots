import React from 'react';
import styled from 'styled-components';

import { DOT_TYPE_DOT } from '../../utils/constants';
import Dot from '../Dot/Dot';

const DotArray = styled.div.attrs({
  style: ({ width, height }) => ({
    width,
    height
  })
})`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const EmptyDot = () => <div style={{ width: '40px', height: '40px' }} />;

const DotList = ({ data, boardHeight, boardWidth, ...restProps }) => (
  <DotArray width={boardWidth * 40} height={boardHeight * 40}>
    {data.map((e, i) => {
      if (e == null) {
        return <EmptyDot key={i.toString()} />;
      }
      switch (e.type) {
        case DOT_TYPE_DOT:
          return <Dot {...restProps} {...e} key={i.toString()} idx={i} />;
        default:
          return <EmptyDot />;
      }
    })}
  </DotArray>
);

export default DotList;
