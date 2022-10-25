import React from 'react'
import GraphContainer from './GraphContainer'
import Data from './Data'
import useWindowSize from '../../../../hooks/useWindowSize'

function Graph() {
  const { width } = useWindowSize()
  return (
    <>
      <GraphContainer>
        <div style={{ width: width <= 768 ? '100%' : '70%' }}>
          <Data />
        </div>
      </GraphContainer>
    </>
  )
}

export default Graph