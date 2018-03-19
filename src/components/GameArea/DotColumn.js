import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { DOT_TYPE_DOT } from '../../utils/constants';
import Dot from '../Dot';

// important flex-direction: column-reverse
const DotCol = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  height: ${props => props.height * 40 + 'px;'};
`;

class Col extends Component {
  render() {
    const { list, col, refreshMatrix, linePanningEnd, colLength } = this.props;
    return (
      <DotCol height={colLength}>
        {list.map((e, i) => {
          switch (e.type) {
            case DOT_TYPE_DOT:
              return (
                <Dot
                  {...e}
                  key={i}
                  col={col}
                  row={i}
                  refreshMatrix={refreshMatrix}
                  linePanningEnd={linePanningEnd}
                />
              );
            default:
              return '';
          }
        })}
      </DotCol>
    );
  }
}

export default connect(state => ({
  colLength: state.gameArea.colLength
}))(Col);
