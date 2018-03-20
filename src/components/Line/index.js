import React from 'react';

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

export default Line;
