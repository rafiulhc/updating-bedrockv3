import React from 'react'
import TextArea from '../TextArea'
import Paragraph from '../../../../../components/Paragraph'
import SectionHeading from '../../../../../components/SectionHeading'
import TokenSupply from './TokenSupply'
import Balance from './Balance'
import BottomCardContainer from './BottomCardContainer'
import bedrock from '../../../../../assets/images/bedrock.svg'
import ImageWrapper from './ImageWrapper'
import Image from 'next/image'
function CardBottom() {
  return (
    <BottomCardContainer position="relative">
      <Balance >
        <SectionHeading textAlign="right">Rockenomics </SectionHeading>
        <SectionHeading textAlign="right">Wallet Balance</SectionHeading>

      </Balance>
      <TokenSupply >
        <Paragraph fontSize="16px">Total Token Supply:</Paragraph>
        <Paragraph fontWeight="500">100,000,000,000,000,000
          (100 Quadrillion)</Paragraph>
          <br/>
        <Paragraph fontSize="16px">Spear Token Supply:</Paragraph>
        <Paragraph fontWeight="500">36,000,000,000,000,000</Paragraph>
      </TokenSupply>
      <ImageWrapper>
        <Image width={"100%"} height={"100%"} src={bedrock} />
      </ImageWrapper>
    </BottomCardContainer>
  )
}

export default CardBottom