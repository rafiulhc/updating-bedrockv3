import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import Stake from '../src/views/Stake'

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
        <Stake />
      </Main>
    </>
  )
}
