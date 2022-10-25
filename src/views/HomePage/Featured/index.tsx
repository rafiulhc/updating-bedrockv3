import React, { useEffect, useRef, useState } from "react";
import featured from "../../../assets/JsonData/featured";
import FeaturedHeader from "./FeaturedHeader";
import FeatureImg from "./FeatureImg";
import Projects from "./Project";
import ScrollArea from "./ScrollArea";
import Image from "next/image";
import TagTitle from "../../../components/TagTitle";
import CardTitle from "../../../components/CardTitle";
import Paragraph from "../../../components/Paragraph";
import ScrollBtn from "../TimeLine/ScrollBtn";
import FeaturedTitle from "./FeaturedTitle";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "./Slider";
import DotSlider from "./DotSlider";




function Featured() {
  const { width } = useWindowSize();
  const [activeFeature, setActiveFeature] = useState(0);

  const scrollRef = useRef(null);

  const featureScroll = (val, index) => {
   setActiveFeature(index);
    index < activeFeature
      ? (scrollRef.current.scrollLeft += -width)
      : (scrollRef.current.scrollLeft += width);
  };

  const scrollStart = (scrollValue: number) => {
    scrollRef.current.scrollLeft += scrollValue;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (activeFeature > featured.length - 2) {
  //       setActiveFeature(0);
  //     } else {

  //       setActiveFeature(activeFeature + 1);
  //     }
  //   }, 10000);
  // }, [activeFeature]);

  return (
    <>
      <FeaturedHeader>
        <FeaturedTitle>
          Featured Projects <br /> Need Funding
        </FeaturedTitle>
        {width > 768 && <ScrollBtn Top="4%" scrollStart={scrollStart} />}

        <ScrollArea ref={scrollRef}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "50px",
            }}
          >
            {
              featured.map((val, index) => {
                return (
                  <Projects key={index}>
                    <FeatureImg>
                      <Image
                        src={val.picture}
                        width={width <= 768 ? 300 : 300}
                        height={180}
                      />
                    </FeatureImg>
                    <TagTitle>{val.tag}</TagTitle>
                    <CardTitle>{val.title}</CardTitle>
                    <Paragraph opacity>{val.detail}</Paragraph>
                  </Projects>
                );
              })
            }
            {/* {width > 768 ? (
              featured.map((val, index) => {
                return (
                  <Projects key={index}>
                    <FeatureImg>
                      <Image
                        src={val.picture}
                        width={width <= 768 ? 300 : 300}
                        height={180}
                      />
                    </FeatureImg>
                    <TagTitle>{val.tag}</TagTitle>
                    <CardTitle>{val.title}</CardTitle>
                    <Paragraph opacity>{val.detail}</Paragraph>
                  </Projects>
                );
              })
            ) : (
              <Projects>
                <FeatureImg>
                  <Image
                    src={featured[activeFeature].picture}
                    width={width <= 768 ? width : 300}
                    height={180}
                  />
                </FeatureImg>
                <TagTitle>{featured[activeFeature].tag}</TagTitle>
                <CardTitle>{featured[activeFeature].title}</CardTitle>
                <Paragraph opacity>{featured[activeFeature].detail}</Paragraph>
              </Projects>
            )} */}
          </div>
        </ScrollArea>

        {width <= 768 && (
          <Slider>
            {featured.map((val, index) => {
              return (
                <DotSlider
                  background={`${activeFeature === index ? "#EC8845" : "#38181F"
                    }`}
                  key={index}
                  onClick={(e) => {
                    // e.preventDefault();
                    featureScroll(300,index)
                    // setActiveFeature(index);
                  }}
                />
              );
            })}
          </Slider>
        )}
      </FeaturedHeader>
    </>
  );
}

export default Featured;
