import React from 'react';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import GithubCorner from 'react-github-corner';

import bg from '../../resources/img/bg.png';
import Qrcode from '../Qrcode';

const Default = props => <Responsive {...props} minWidth={415} />;
const Mobile = props => <Responsive {...props} maxWidth={414} />;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${bg}) center center no-repeat;
  z-index: -2;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 363px;
  height: 640px;
  top: 50%;
  left: 50%;
  margin-top: -319px;
  margin-left: -181px;
  background-color: #fff;
  z-index: -1;
`;

export default class extends React.Component {
  render() {
    const child = (
      <iframe
        style={{
          width: '364px',
          height: '641px',
          position: 'absolute',
          top: '-1px',
        }}
        title="two-dots"
        src={
          process.env.NODE_ENV === 'production'
            ? 'https://charles8xu.github.io/react-two-dots/'
            : 'http://localhost:3000/#/'
        }
        frameBorder="0"
      />
    );

    return (
      <React.Fragment>
        <Default>
          <Background>
            <Wrapper>{child}</Wrapper>
          </Background>
          <GithubCorner
            href="https://github.com/charles8xu/react-two-dots/"
            bannerColor="#151513"
            octoColor="#fff"
            size={80}
            direction="right"
          />
          <Qrcode />
        </Default>
        <Mobile>{this.props.children}</Mobile>
      </React.Fragment>
    );
  }
}
