import React from "react"
import Address from "./AddressTop"
import Explore from "./Explore"
import Social from "./Social"
import Subscribe from "./Subscribe"
import Image from "next/image"
import Paragraph from "../../Paragraph"
import SectionHeading from "../../SectionHeading"
import { Row, Col, Container } from "react-bootstrap"
import FooterImage from "../FooterImage"
import Icon from "./Icon"
import exploreFooter from "../../../assets/JsonData/exploreFooter"
import socialFooter from "../../../assets/JsonData/socialFooter"
import Email from "./Email"
import Button from "../../Button"
import useWindowSize from "../../../hooks/useWindowSize"
import styled from "styled-components"
import AddressTop from "./AddressTop"
import AddressBottom from "./AddressBottom"

const Col1 = styled(Col)`
  padding: 0;
  margin: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 20px;
  margin-top: 10px;
  gap: 10px;
  cursor:pointer;
  :hover{
    color:#000000;
  }
`


function FooterSections() {
  const { width } = useWindowSize()
  return (
    <>
      {/* <div> */}
      
        <AddressTop>
          <Image src="/images/footerLogo.png" alt="Footer Logo" width={180} height={60} />

          <Paragraph marginTop="30px">
            © 2022 Bedrock finance, <br /> All rights reserved
          </Paragraph>
          <Paragraph>Disclaimer • Terms Of use</Paragraph>
        </AddressTop>
      

      {
        width <= 768 && <FooterImage>
          <Image src="/images/footerLogo.png" alt="Footer Logo" width={200} height={60} />
        </FooterImage>


      }
      <Explore>
        <SectionHeading textAlign="left">Explore</SectionHeading>
        <Container>
          <Row>
            {exploreFooter.map((val, index) => {
              return (
                <Col1 key={index} xs={6} md={6}>
                  {val}
                </Col1>
              )
            })}
          </Row>
        </Container>
      </Explore>
      <Social >
        <SectionHeading textAlign="left">Social</SectionHeading>
        <Container>
          
             <Row>
            <Col1 xs={6} md={6}>
              <img width={18} alt="Social Icon" src={`/images/Twitter.png`} />Twitter
            </Col1>
            <Col1 xs={6} md={6}>
              <img width={18} alt="Social Icon" src={`/images/Instagram.png`} />Instagram
            </Col1>
            <Col1 xs={6} md={6}>
              <img width={18} alt="Social Icon" src={`/images/Discord.png`} />Discord
            </Col1>
            <Col1 xs={6} md={6}>
              <img width={18} alt="Social Icon" src={`/images/Telegram.png`} />Telegram
            </Col1>
            <Col1 xs={6} md={6}>
              <img width={12} alt="Social Icon" src={`/images/Facebook.png`} />Facebook
            </Col1>
            
          </Row>
        </Container>
      </Social>
      <Subscribe >
        <SectionHeading>Subscribe us</SectionHeading>
        <Email>
          <input placeholder="Enter Email Address" />
          <Button
            fontSize={width <= 768 ? "12px":"14px"}
            background="#000216"
            height={width > 768 ? "35px" : "29px"}
            // width="100px"
            width={width<=850 ? "70px" : width<=900 ? "80px" : width<=1100 ? "90px"  : width<=768 ?"110px":"100px"  }

            
            marginRight="15px"
          >
            Subscribe
          </Button>
        </Email>
       {
        width>768 &&  <Paragraph marginTop="10px" >
        By submitting your email you agree to our Terms of Use and Sale and
        Privacy Policy. You will receive email communications from us for
        marketing, informational, and promotional purposes and can opt-out at
        any time.
      </Paragraph>
       }
      </Subscribe>


        <AddressBottom>

          <Paragraph>
            © 2022 Bedrock finance,All rights reserved
          </Paragraph>
          <Paragraph>Disclaimer • Terms Of use</Paragraph>
        </AddressBottom>
    
    </>
  )
}

export default FooterSections
