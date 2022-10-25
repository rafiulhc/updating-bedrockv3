import React from 'react'
import styled from 'styled-components';
import {SwapViewContainer} from '../src/views/Swap/index';

const Main = styled.div`
  min-height: 100vh;
  min-height: 2000px;
  width: 100%;
  background: #000216;
`

export default function Swap() {

    return <Main><SwapViewContainer /></Main>
}