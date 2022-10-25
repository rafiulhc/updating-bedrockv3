import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Hero from './Hero'
import styled from 'styled-components'
import Rokenomics from './Rokenomics'
import Timeline from './TimeLine'
import Featured from './Featured'
import EcoSystem from './EcoSystem'
import DripinTimer from '../../components/DripinTimer'
import Comments from './Comments'
import Partners from './Partners'
import Community from './Community'
import Footer from '../../components/Footer'

import useMetaMask from '../../hooks/useWindowSize'
import HeroBanner from './Hero/HeroBanner/index'
import HeroVideos from './Hero/HeroVideos/index'


import axios from 'axios'
import Earn from './Earn/index'
const Main = styled.div`


min-height: 100vh;
min-height:2000px;
width:100%;
background: #000216;
`
export default function HomePage(

) {

  return (
    <>
      <Main>
        <Navbar />
        <HeroBanner />
        <Hero />
        <Earn/>
        <HeroVideos />
        <Rokenomics />
        <Timeline />
        <Featured />
        <EcoSystem />
        <DripinTimer />
        <Comments />
        <Partners />
        <Community />
        <Footer />
      </Main>


    </>
  )
}
