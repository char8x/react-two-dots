import React from 'react';
import PropTypes from 'prop-types';

import Line from './index';

const FIXED_LINE_HEIGHT = 6;
const FIXED_LINE_WIDTH = 40;

const Lines = ({
  rectangle,
  color,
  panningDot,
  lineLength,
  lineAngle,
  linePosition,
  connectedLines
}) => (
  <React.Fragment>
    {panningDot !== -1 &&
      !rectangle && (
        <Line
          color={color}
          width={lineLength}
          height={FIXED_LINE_HEIGHT}
          deg={lineAngle}
          left={linePosition.x}
          top={linePosition.y}
        />
      )}
    {connectedLines.map((e, i) => (
      <Line
        key={i.toString()}
        width={FIXED_LINE_WIDTH}
        height={FIXED_LINE_HEIGHT}
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
  panningDot: PropTypes.number,
  rectangle: PropTypes.bool,
  connectedLines: PropTypes.array,
  linePosition: PropTypes.object,
  lineLength: PropTypes.number,
  lineAngle: PropTypes.number
};

export { FIXED_LINE_HEIGHT };
export default Lines;
