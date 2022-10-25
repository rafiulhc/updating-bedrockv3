import Dashboard from "../src/views/Dashboard/index"
import styled from 'styled-components'

const Main = styled.div`
  min-height: 100vh;
  min-height: 2000px;
  width: 100%;
  background: #000216;
`
export default function Staking() {
    return (
      <>
        <Main>
          <Dashboard />
        </Main>
      </>
    )
  }
