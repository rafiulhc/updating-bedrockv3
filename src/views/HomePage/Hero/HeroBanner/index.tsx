import React from "react";
import SubTitle from "../../../../components/SubTitle";
import Title from "../../../../components/Title";
import CharacterImage from "../CharacterImage";
import CharacterImageBackground from "../CharacterImageBackground"
import HeroText from "../HeroText";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
import HeroWrapper from "./HeroWrapper";
import Character from "../../../../assets/images/character.png";
import ImageBackground from "./ImageBackground";
import Image from "next/image";
import BannerTitle from "./BannerTitle";
import useWindowSize from "../../../../hooks/useWindowSize";



function HeroBanner() {
  const { width } = useWindowSize();


  return (
    <>
      <HeroWrapper>
        <HeroLeft>
          <HeroText >
            <BannerTitle>
              Your gateway <br /> to Safer <br /> Investments.
            </BannerTitle>
            <SubTitle>
              Swap, Stake and Earn up to 50% APY <br /> on Bedrockswap.finance
            </SubTitle>
          </HeroText>
        </HeroLeft>
        <HeroRight>

          <CharacterImage>
            {
              width > 480 &&
              <CharacterImageBackground />
            }




            <Image src={Character} />
          </CharacterImage>

          {
            width < 480 &&
            <>
              <ImageBackground Width={width < 300 ? "10%" : "50%"} height="200px" background="rgba(236, 136, 69, 0.5) " top="100px" right="2%" />
              <ImageBackground Width="50%" height="170px" background="#893242" top="300px" left="0px" />
            </>
          }

        </HeroRight>
      </HeroWrapper>
    </>
  );
}

export default HeroBanner;
