import React from 'react';
import RcSwitch from 'rc-switch';
import styled from 'styled-components';

import './index.css';
import imgTrue from '../../resources/img/true.svg';
import imgFalse from '../../resources/img/false.svg';

const True = styled.img.attrs({
  src: imgTrue,
  alt: 'true',
})`
  width: 30px;
  height: 30px;
`;

const False = styled.img.attrs({
  src: imgFalse,
  alt: 'false',
})`
  width: 30px;
  height: 30px;
`;

const Switch = props => {
  return (
    <div>
      <RcSwitch
        onChange={props.onChange}
        checkedChildren={<True />}
        unCheckedChildren={<False />}
        checked={props.checked}
      />
      <div
        style={{
          color: '#fff',
          fontSize: '12px',
          marginTop: '8px',
          textAlign: 'center',
        }}
      >
        {props.label}
      </div>
    </div>
  );
};

export default Switch;
