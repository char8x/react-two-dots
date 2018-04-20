import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Centered } from '../Layout';
import { COLOR_RED, COLOR_BLUE } from '../../utils/constants';

const flickerOpacity = keyframes`
  0% {
    transform: translate(0 0);
    opacity: 1;
  }
  49.99% {
    opacity: 1;
    transform: translate(60px, 0);
  }
  50% {
    opacity: 0;
    transform: translate(60px, 0);
  }
  100% {
    opacity: 0;
    transform: translate(0, 0);
  }
`;

const flicker = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(60px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const Dot = styled.div`
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      top: 70px;
      left: 40px;
      ${props => props.color && 'background-color: ' + props.color + ';'}
      ${props =>
        props.animate &&
        'animation: ' + props.animate + ' 1.9s linear infinite;'}
      ${props => props.delay && 'animation-delay: ' + props.delay + ';'}
`;

const Logo = () => (
  <div
    style={{
      width: '200px',
      height: '200px',
      transform: 'translate(-100px, -100px) scale(1) translate(100px, 100px)'
    }}
  >
    <Dot color={COLOR_RED} animate={flicker} delay="-0.95s" />
    <Dot color={COLOR_BLUE} animate={flicker} delay="0s" />
    <Dot color={COLOR_RED} animate={flickerOpacity} delay="-0.95s" />
  </div>
);

const Text = styled.span`
  color: #60626e;
  font-size: 24px;
  text-align: center;
`;

export default () => (
  <Centered vertical horizontal color="#ECE0CC">
    <Logo />
    <Text>正在收集点点...</Text>
  </Centered>
);
