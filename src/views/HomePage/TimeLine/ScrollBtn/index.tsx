import React, { useRef } from 'react'
import RoundBtn from '../../../../components/RoundBtn'
import ScrollContainer from './ScrollContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
interface ScrollProps {
  Top?: any
  scrollStart?: any
}
function ScrollBtn({ scrollStart, Top }: ScrollProps) {

  return (
    <>
      <ScrollContainer Top={Top} >
        <RoundBtn  onClick={() => scrollStart(-50)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </RoundBtn>
        <RoundBtn  onClick={() => scrollStart(+50)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </RoundBtn>
      </ScrollContainer>
    </>
  )
}

export default ScrollBtn