import React from 'react';
import PropTypes from 'prop-types';

import Line from './index';

const FIXED_LINE_WIDTH = 40;

const Lines = ({
  panningDot,
  rectangle,
  color,
  lineLength,
  lineAngle,
  linePosition,
  connectedLines
}) => (
  <React.Fragment>
    {panningDot != null &&
      !rectangle && (
        <Line
          color={color}
          width={lineLength}
          deg={lineAngle}
          left={linePosition.x}
          top={linePosition.y}
        />
      )}
    {connectedLines.map((e, i) => (
      <Line
        key={i.toString()}
        width={FIXED_LINE_WIDTH}
        color={e.color}
        deg={e.deg}
        left={e.x}
        top={e.y}
      />
    ))}
  </React.Fragment>
);

Lines.propTypes = {
  color: PropTypes.string,
  panningDot: PropTypes.object,
  rectangle: PropTypes.bool,
  connectedLines: PropTypes.array,
  linePosition: PropTypes.object,
  lineLength: PropTypes.number,
  lineAngle: PropTypes.number
};

export default Lines;
