import React from 'react';
import PropTypes from 'prop-types';

const Line = ({ top, left, width, height, color, deg }) => (
  <div
    style={{
      top,
      left,
      width,
      height,
      backgroundColor: color,
      transform: 'rotate(' + deg + 'deg)',
      position: 'fixed',
      zIndex: -2,
      transformOrigin: 'center left'
    }}
  />
);

Line.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
  deg: PropTypes.number
};

Line.defaultProps = {
  deg: 0,
  color: '#000'
};

export default Line;
