
import React, { useState, useRef, useEffect } from "react";
import videoLinks from "../../../../assets/JsonData/videoLinks";
import Iframe from "../../../../components/Iframe";
import VideoContainer from "../../Earn/VideoContainer";
import VideoContainer2 from "./VideoContainer2";
import useWindowSize from "../../../../hooks/useWindowSize";
import Slider from "./Slider";
import DotSlider from "./DotSlider";
import VideoRow from "./VideoRow";
import Button from "../../../../components/Button";
import HeroVideoWrapper from "./HeroVideoWrapper";
import ScrollArea from "./ScrollArea"
function HeroVideos() {
  const { width } = useWindowSize();
  const featureRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [activeDot,setActiveDot]=useState(0)
  const scrollRef = useRef(null);

  const scrollStart = (scrollValue: number) => {
    scrollRef.current.scrollLeft += scrollValue;
  };

  const arrayHalf = Math.floor(videoLinks.length / 2);
  const featureScroll = (val, index) => {
 
    setActiveDot(index)
    index < activeVideo
      ? (featureRef.current.scrollLeft += -width)
      : featureRef.current.scrollLeft += width; setActiveVideo(index);
  };

  const scrolled = () => { };


  useEffect(() => {
    // setTimeout(() => {
    //   if (activeVideo > videoLinks.length - 2) {
    //     setActiveVideo(0);
    //   } else {

    //     setActiveVideo(activeVideo + 1);
    //   }
    // }, 5000);
  }, [activeVideo]);


  return (
    <>
      <HeroVideoWrapper>
        <VideoRow ref={featureRef} onScroll={scrolled}>


          {width <= 480 ? (
            <ScrollArea ref={scrollRef}>
              
              <div style={{ display: "flex", justifyContent: "center", gap: "50px", marginLeft: "600px" }}>
                {
                  videoLinks.map((val, index) => {
                    return (
                      <VideoContainer2   width={width} height="60%" key={index}>
                        <Iframe src={val.link} />
                      </VideoContainer2>
                    );
                  })
                }
              </div>
            </ScrollArea>
          ) :
            (

              <div style={{ display: "flex", justifyContent: "center", gap: "20px", width: "80%", alignItems: "center"}}>
                {
                  videoLinks.map((val, index) => {
                    return (
                      <VideoContainer2   width={width} key={index}>
                        <Iframe src={val.link} />
                      </VideoContainer2>
                    );
                  })
                }
              </div>
            )

          }
        </VideoRow>
        {width <= 480 && (
          <Slider>
            {videoLinks.map((val, index) => {
              return (
                <DotSlider
                  background={`${activeVideo === index ? "#EC8845" : "#38181F"}`}
                  key={index}
                  onClick={() => featureScroll(300, index)}
                />
              );
            })}
          </Slider>
        )}
        <Button  outline="#EC8845" marginTop="50px" position={width<1000? "static":"absolute"} top={width <= 480 ? "418px" : "80%"} width="280px">Sign up for your 1 on 1 crypto</Button>
      </HeroVideoWrapper>

    </>
  );
}

export default HeroVideos;
