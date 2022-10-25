import React, { useRef } from "react";
import ScrollArea from "./ScrollArea";
import timeline from "../../../assets/JsonData/timeline";
import TimeLineCard from "./TimelineCard";
import TagTitle from "../../../components/TagTitle";
import ScrollBtn from "./ScrollBtn";
import CardTitle from "../../../components/CardTitle";
import Container from "./Container";
import TimeLineTitle from "./TimeLineTitle";
import useWindowSize from "../../../hooks/useWindowSize";
function Timeline() {
  const { width } = useWindowSize();
  const scrollRef = useRef(null);

  const scrollStart = (scrollValue: number) => {
    scrollRef.current.scrollLeft += scrollValue;
  };

  return (
    <>
      <Container>
        <TimeLineTitle>Bedrock Timeline</TimeLineTitle>

        {width > 480 && <ScrollBtn  scrollStart={scrollStart} Top="120px" />}
        <ScrollArea ref={scrollRef}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "9%",

              gap: "50px",
              marginTop:"60px"

            }}
          >
            {timeline.map((val, index) => {
              return (
                <TimeLineCard key={index}>
                  <TagTitle>{val.date}</TagTitle>
                  <CardTitle>{val.title}</CardTitle>
                </TimeLineCard>
              );
            })}
          </div>
        </ScrollArea>
      </Container>
    </>
  );
}

export default Timeline;
