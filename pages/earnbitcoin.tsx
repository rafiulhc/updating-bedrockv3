import styled from 'styled-components'

import Earn from '../src/views/Earn'
const Main = styled.div`
  min-height: 100vh;
  min-height: 2000px;
  width: 100%;
  background: #000216;
`
export default function EarnBitcoin() {
  return (
    <>
      <Main>
        <Earn />
      </Main>
    </>
  )
}
