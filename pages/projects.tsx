import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import Projects from '../src/views/Projects'
import handler from './api/getProjects'
import axios from 'axios'
const Main=styled.div`


min-height: 100vh;
min-height:2000px;
width:100%;
background: #000216;
`
export default function Project({projects}) {



  return (
   <>
<Main>
  <Projects projects={projects} />
  </Main>

   
   </>
  )
}

export async function getServerSideProps() {


 

const res=await axios.get("http://localhost:3000/api/getProjects");

const projects=await res.data || null;

  return {
    props: {
      projects
    },
  }
}
