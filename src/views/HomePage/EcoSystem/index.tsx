import React from "react";
import EcoHeader from "./EcoHeader";
import EcoImage from "./EcoImage";
import Image from "next/image";
import SectionHeading from "../../../components/SectionHeading";
import useWindowSize from "../../../hooks/useWindowSize";
import EcoMobile from "./EcoMobile";
import EcoHeading from "./EcoHeading";



function EcoSystem() {

  const { width } = useWindowSize();
  return (
    <>
      <EcoHeader>
        <EcoHeading fontSize={width <= 480 ? "30px" : "50px"} >Bedrock Ecosystem</EcoHeading>
        {
          width > 768 ? <EcoImage>
            <img width={"100%"} height={"100%"} src="/images/ecosystem-web.png" />
          </EcoImage> : <EcoImage> <img width={"100%"} height={"100%"} src="/images/ecosystem-mobile.png" /></EcoImage>
        }


      </EcoHeader>
    </>
  );
}

export default EcoSystem;
