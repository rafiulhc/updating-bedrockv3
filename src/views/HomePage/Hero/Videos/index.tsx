

import React, { useState, useRef, useEffect } from "react";
import videoLinks from "../../../../assets/JsonData/videoLinks";
import Iframe from "../../../../components/Iframe";
import VideoContainer from "../../Earn/VideoContainer";
import useWindowSize from "../../../../hooks/useWindowSize";
import Slider from "./Slider";
import DotSlider from "./DotSlider";
import VideoRow from "./VideoRow";
function Videos() {
  const { width } = useWindowSize();
  const featureRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [scroll, setScroll] = useState(0);

  const arrayHalf = Math.floor(videoLinks.length / 2);
  const featureScroll = (val, index) => {

    index < activeVideo
      ? (featureRef.current.scrollLeft += -width)
      : (featureRef.current.scrollLeft += width);
  };

  const scrolled = () => { };


  // useEffect(() => {
  //   setTimeout(() => {
  //     if (activeVideo > videoLinks.length - 2) {
  //       setActiveVideo(0);
  //     } else {

  //       setActiveVideo(activeVideo + 1);
  //     }
  //   }, 5000);
  // }, [activeVideo]);


  return (
    <>
      <VideoRow ref={featureRef} onScroll={scrolled}>


        {width <= 480 ? (
          <VideoContainer width={width} height="60%">
            <Iframe src={videoLinks[activeVideo].link} />
          </VideoContainer>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", width: "100%", alignItems: "center" }}>
            {
              videoLinks.map((val, index) => {
                return (
                  <VideoContainer width={width} height="60%" key={index}>
                    <Iframe src={val.link} />
                  </VideoContainer>
                );
              })
            }
          </div>
        )}
      </VideoRow>
      {width <= 480 && (
        <Slider>
          {videoLinks.map((val, index) => {
            return (
              <DotSlider
                background={`${activeVideo === index ? "#EC8845" : "#38181F"}`}
                key={index}
                onClick={() => featureScroll(350, index)}
              />
            );
          })}
        </Slider>
      )}
    </>
  );
}

export default Videos;
