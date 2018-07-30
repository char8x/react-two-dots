import styled from 'styled-components';

import qrcode from '../../resources/img/qrcode.svg';

const Qrcode = styled.img.attrs({
  src: qrcode,
  alt: 'qrcode',
})`
  height: 30px;
  width: 30px;
  position: fixed;
  right: 15px;
  bottom: 15px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    height: 120px;
    width: 120px;
    cursor: none;
  }
`;

export default Qrcode;
