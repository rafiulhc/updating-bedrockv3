import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";

import SectionHeading from "../../../components/SectionHeading";
import EcoMobileWrapper from "./EcoMobileWrapper";
import EcoRow from "./EcoRow";
import Paragraph from "../../../components/Paragraph";
import EcoPart from "./EcoPart";
import Border from "./Border";

function EcoMobile() {
  return (
    <>
      <EcoMobileWrapper>
        <EcoRow >
          <Col>
            <EcoPart>
              <SectionHeading>Bedrock</SectionHeading>

              <Paragraph>DApp, Swap, Stake, Invest Earn</Paragraph>
            </EcoPart>
            <Border left="50%" height="2%" borderLeft/>
          </Col>
        </EcoRow>
        <EcoRow>
          <Col>
            <EcoPart>
              <SectionHeading>Bedrock</SectionHeading>
              <Paragraph>BNB for ROCK or BUSD</Paragraph>
            </EcoPart>
            <Border left="25%" top="32%" height="2%" borderLeft/>
            <Border left="75%" top="32%" height="2%" borderLeft/>


          </Col>
        </EcoRow>
        <EcoRow>
          <Col>
            <EcoPart>
              <SectionHeading>BUSD</SectionHeading>
            </EcoPart>
            <Border left="2%" top="40%" height="2%" width="3%" borderTop/>
            <Border left="1%" top="40%" height="19%" width="2px" borderLeft/>
            <Border left="2%" top="58.8%" height="2%" width="3%" borderTop/>



          </Col>
          <Col>
            <EcoPart>
              <SectionHeading>ROCK</SectionHeading>

            </EcoPart>
            <Border left="60%" top="49%" height="19%" borderLeft/>
            <Border left="80%" top="49%" height="2%" borderLeft/>
          </Col>
        </EcoRow>
        <EcoRow>
          <Col>
            <EcoPart>
              <SectionHeading>Bedrock Projects</SectionHeading>
            </EcoPart>
            <Border left="15%" top="66%" height="2%" borderLeft/>
            <Border left="42%" top="66%" height="2%" borderLeft/>
          </Col>
          <Col >
            <EcoPart style={{width:"70%",marginLeft:"auto"}}>
              <SectionHeading>Staking</SectionHeading>
            </EcoPart>
            <Border left="94%" top="58%" height="2%" width="3%" borderTop/>
            <Border left="98%" top="58%" height="19%" width="1%" borderLeft/>
            <Border left="94%" top="76.8%" height="2%" width="3%" borderTop/>
          </Col>
        </EcoRow>
        <EcoRow>
          <Col>
            <EcoPart>
              <Paragraph>
                Invest / Fund Project with BUSD Earn Interest
              </Paragraph>
            </EcoPart>
          </Col>
          <Col>
            <EcoPart>
              <Paragraph>Collaterlize / Start a project 50%</Paragraph>
            </EcoPart>
            <Border left="42%" top="83%" height="2%" width="3%" borderLeft/>

          </Col>
          <Col>
            <EcoPart>
              <Paragraph>Stake & Earn ROCK 50% APY as supply lasts</Paragraph>
            </EcoPart>
          </Col>
        </EcoRow>
        <EcoRow>
          <Col>
            <EcoPart>
              <SectionHeading>2.5%</SectionHeading>

              <Paragraph>Collateral Fee ROCK converted into BTCB</Paragraph>
            </EcoPart>
            <Border left="48%" top="92%" height="2%" width="4%" borderTop/>

          </Col>
          <Col>
            <EcoPart>
              <Paragraph>Stake ROCK, Earn BTCB 1% Daily Drip</Paragraph>
            </EcoPart>
          </Col>
        </EcoRow>
      </EcoMobileWrapper>
    </>
  );
}

export default EcoMobile;
