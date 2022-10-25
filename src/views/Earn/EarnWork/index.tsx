import React from 'react'
import earnWork from '../../../assets/JsonData/earnWork'
import SectionHeading from '../../../components/SectionHeading'
import WorkRow from '../../Stake/WorkRow'
import WorkWrapper from './WorkWrapper'
import tick from '../../../assets/images/tick.png';
import Image from 'next/image'
import Paragraph from '../../../components/Paragraph'
import TickImg from './TickImg'
import useWindowSize from '../../../hooks/useWindowSize'
import { HowItWorks } from '../../Stake/Components/HowItWorks/HowItWorks'

function EarnWork() {
    const {width}=useWindowSize();
    const paragraphs = earnWork.map(val => val.work);
  return (
    <HowItWorks
        hideVideo={true}
        paragraphs={paragraphs}
        title="How It Works"
    />
  )
}

export default EarnWork