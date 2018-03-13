import React from 'react'
import styled from 'styled-components'

import loading from './loading.svg'
import { Centered } from '../Layout'

const Logo = styled.img.attrs({
  src: loading,
  alt: 'loading'
})`
  width: 100px;
  height: 100px;
`

const Text = styled.span`
  color: #60626e;
  font-size: 1.5rem;
  text-align: center;
`

export default () => (
  <Centered vertical horizontal color="#ECE0CC">
    <Logo />
    <Text>正在收集点点...</Text>
  </Centered>
)
