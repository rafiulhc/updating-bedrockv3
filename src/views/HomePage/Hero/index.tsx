import Image from "next/image";
import React from "react";
import Rectangle1 from "./Rectangle1";
import Rectangle2 from "./Rectangle2";

import Rect1 from "../../../assets/images/Rectangle1.png";
import Rect2 from "../../../assets/images/Rectangle2.png";

import mobileRect1 from "../../../assets/images/mobileRect1.svg";
import mobr1 from "../../../assets/images/mobr1.png";

import mobileRect2 from "../../../assets/images/mobileRect2.svg";
import Character from "../../../assets/images/character.png";
import Title from "../../../components/Title";
import HeroImage from "./HeroImage";
import CharacterImage from "./CharacterImage";
import diamond1 from "../../../assets/images/diaa.png";

import diamond2 from "../../../assets/images/diamond22.svg";
import diamond3 from "../../../assets/images/diamond33.svg";
import mobileDiamond1 from "../../../assets/images/mobileDiamond1.svg";
import SubTitle from "../../../components/SubTitle";
import Button from "../../../components/Button";
import HeroText from "./HeroText";
import FunctionalityHype from "./FunctionalityHype";
import DiamondContainer from "./DiamondContainer";
import mobileDiamond2 from "../../../assets/images/mobileDiamond22.png";
import Earn from "./Earn";
import Videos from "./Videos";
import useWindowSize from "../../../hooks/useWindowSize";
import CurvesContainer from "./CurvesContainer";



export default function Hero() {
  const { width } = useWindowSize();
  return (
    <>

      <CurvesContainer>
        <Rectangle1>
          <Image width={width>=1900 && width}  src={width <= 783  ? mobr1 : Rect1} />
        </Rectangle1>

        <FunctionalityHype />

        <DiamondContainer
          top={width <= 783 ? "75%" : "65%"}
          left={width <= 783 ? "10%" : "1%"}
        >
          <Image
            style={{
              mixBlendMode: "soft-light",


            }}
            src={width <= 768 ? diamond1 : diamond1}
          />
        </DiamondContainer>
        <DiamondContainer
          top={width <= 783 ? "10%": width<=412 ? "8%" : "62%"}
          left={width<=412 ? "72%" :  width<=480 ? "70%" : width <= 600 ? "62%" : width <= 783 ? "70%" :  "45%"}
        >
          <Image
            width={100}
            style={{ mixBlendMode: "soft-light" }}
            src={width <= 768 ? mobileDiamond2 : diamond2}
          />
        </DiamondContainer>
        {
          width > 768 &&

          <DiamondContainer
            left="9%"
            top="80%"

          >
            <Image style={{ mixBlendMode: "soft-light" }} src={diamond3} />
          </DiamondContainer>
        }
       <Rectangle2 marginTop={width <= 768 ? "-2px" : "-10px"}>
        <Image width={width>=1900 && width} src={width <= 783 ? mobileRect2 : Rect2} />
      </Rectangle2>
       

      </CurvesContainer>
    </>
  );
}
