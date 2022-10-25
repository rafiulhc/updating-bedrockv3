import React from 'react'
import FooterCharacter from './FooterCharacter'
import FooterHeader from './FooterHeader'
import footerRock from '../../assets/images/footerRock.png'
import Image from 'next/image'
import LinksRow from './LinksRow'
import FooterSections from './FooterSections'
import useWindowSize from '../../hooks/useWindowSize'
import footerbg from '../../assets/images/footerRect1.svg'
import footerbgMobile from '../../assets/images/footerMobileRect.png'
import FooterBottom from './FooterBottom'
import FooterBotCharacter from './FooterBotCharacter'

function Footer() {

  const { width } = useWindowSize();

  return (
    <>
      <FooterHeader width={width} >

        <FooterCharacter >
          <Image alt="Footer Rock" src={footerRock} />
        </FooterCharacter>
       

      </FooterHeader>
      <FooterBottom width={width}>




  <FooterBotCharacter>
  <Image alt="Footer Rock" src={footerRock} />
</FooterBotCharacter>


<LinksRow  >
  <FooterSections ></FooterSections>
</LinksRow>

</FooterBottom>
    </>
  )
}

export default Footer