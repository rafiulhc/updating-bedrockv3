import React from 'react'
import GraphContainer from './Graph/GraphContainer'
import Graph from './Graph'
import Parent from './Parent'
import Cards from './Cards'
import SectionHeading from '../../../components/SectionHeading'
import useWindowSize from '../../../hooks/useWindowSize'

function Rokenomics() {
  const { width } = useWindowSize()
  return (
    <>
      <Parent >
        <SectionHeading fontSize="40px" position="absolute" marginBottom="100px" left={width <= 768 ? "50%" : "11%"} top={width <= 783 && "0%"}>Rockenomics</SectionHeading>

        <Graph />
        <Cards />
      </Parent>
    </>
  )
}

export default Rokenomics