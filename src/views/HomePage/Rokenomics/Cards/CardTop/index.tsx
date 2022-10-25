import Image from 'next/image'
import React from 'react'
import Paragraph from '../../../../../components/Paragraph'
import CardContainer from '../CardContainer'
import TopImages from './TopImages'
import bedrockback from '../../../../../assets/images/bedrockback.png'
import cardrock from '../../../../../assets/images/cardrock.png'
import useWindowSize from "../../../../../hooks/useWindowSize";

import TextArea from '../TextArea'
import ImageWrapper from './ImageWrapper'





function CardTop() {
  const { width } = useWindowSize();
  return (
    <>

      <CardContainer>

        <TextArea>
          <Paragraph fontWeight="350" fontSize={width < 768 && "18px"}  >
            Sed ut perspiciatis unde omnis iste natus error sit volup tatem accus antium totam rem a periam.

          </Paragraph >
          <br />
          <Paragraph fontWeight="350" fontSize={width < 768 && "18px"}  >
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,

          </Paragraph>
        </TextArea>
        <TopImages>

          <ImageWrapper style={{borderRadius:"10px",width:"100%",height:"100%",display:"flex"}} >
            <Image style={{borderRadius:"10px"}} src={bedrockback} />
            <ImageWrapper style={{marginTop:"-7%",width:"100%",height:"100%",display:"flex"}} >
            <Image src={cardrock} />

          </ImageWrapper>
          </ImageWrapper>
          {/* <ImageWrapper >
            <Image src={cardrock} />

          </ImageWrapper> */}
        </TopImages>

      </CardContainer>

    </>
  )
}

export default CardTop