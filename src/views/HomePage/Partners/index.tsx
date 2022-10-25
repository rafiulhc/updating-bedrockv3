import React from "react";
import PartnerWrapper from "./PartnerWrapper";
import partners from "../../../assets/JsonData/partners";
import Image from "next/image";
import PartnerImage from "./PartnerImage";
import PartnerRow from "./PartnerRow";
import SectionHeading from "../../../components/SectionHeading";
import useWindowSize from "../../../hooks/useWindowSize";

import { Row, Col, Container } from "react-bootstrap";

function Partners() {
  const { width } = useWindowSize();

  return (
    <>
      <PartnerWrapper>
        <SectionHeading marginBottom="30px">Partenered with</SectionHeading>

        {width > 768 ? (
          <>
            <PartnerRow>
              {partners.slice(0, 4).map((val, index) => {
                return (
                  <PartnerImage key={index}>
                    <img width="100%" height="100%" src={val} />
                  </PartnerImage>
                );
              })}
            </PartnerRow>
            <PartnerRow padding="10px 20%">
              {partners.slice(4, 6).map((val, index) => {
                return (
                  <PartnerImage key={index}>
                    <img width="100%" height="100%" src={val} />
                  </PartnerImage>
                );
              })}
            </PartnerRow>
          </>
        ) : (
          <Container>
            <Row padding="10px 20%" >
              {partners.slice(0, 6).map((val, index) => {
                return (
                  <Col xs={6} key={index} style={{display:"flex",justifyContent:"center"}}>
                    <PartnerImage key={index}>
                      <img width="100%" height="100%" src={val} />
                    </PartnerImage>
                  </Col>
                );
              })}
            </Row>
          </Container>
        )}
      </PartnerWrapper>
    </>
  );
}

export default Partners;
