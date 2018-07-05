import React from 'react';
import styled from 'styled-components';

import star from '../../resources/img/star.svg';

const Star = styled.img.attrs({
  src: star,
  alt: 'star',
})`
  width: 10px;
  height: 10px;
  filter: drop-shadow(0px 1000px #f3c774);
  transform: translateY(-1000px);
`;

export default function(props) {
  if (props.score > 1000) {
    // 3 stars
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Star />
        <Star />
        <Star />
      </div>
    );
  } else if (props.score > 500) {
    // 2 stars
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Star />
        <Star />
      </div>
    );
  } else if (props.score > 200) {
    // 1 star
    return <Star />;
  }
  return (
    <div
      style={{
        height: '10px',
      }}
    />
  );
}
