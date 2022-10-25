import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CardTitle from "../../../components/CardTitle";
import Comment from "./Comment";
import CommentDetail from "./CommentDetail";
import CommentHeader from "./CommentHeader";
import CommentImage from "./CommentImage";
import CommentRow from "./CommentRow";
import CommentsWrapper from "./CommentsWrapper";
import TagTitle from "../../../components/TagTitle";
import CommentText from "./CommentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import RoundBtn from "../../../components/RoundBtn";
import commentsData from "../../../assets/JsonData/commentsData";
import SectionHeading from "../../../components/SectionHeading";
import Paragraph from "../../../components/Paragraph";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "./Slider";
import DotSlider from "./DotSlider";
import CommentCard from "./CommentCard";

function Comments() {
  const { width } = useWindowSize();
  const scrollRef = useRef(null);

  const [activeComment, setActiveComment] = useState(0);

  const scrollStart = (scrollValue: number) => {
    scrollRef.current.scrollLeft += scrollValue;
  };
  useEffect(() => {
    setTimeout(() => {
      if (activeComment > commentsData.length - 2) {
        setActiveComment(0);
      } else {
        setActiveComment(activeComment + 1);
      }
    }, 2000);
  }, [activeComment, width]);
  return (
    <>
      <CommentsWrapper>
        <RoundBtn  marginTop={width>=1400 ? "10%" :"12%"} onClick={() => scrollStart(-50)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </RoundBtn>

        {width > 790 ? (
          <CommentRow ref={scrollRef}>
            <CommentCard>
              <SectionHeading
                fontSize="38px"
                marginBottom="20px"
                position="absolute"
                
              >
                What People Says
              </SectionHeading>

              {commentsData.map((val, index) => {
                return (
                  <Comment key={index}>
                    <CommentHeader>
                      <CommentImage>
                        <img src={val.picture} width={120} height={120} />
                      </CommentImage>
                      <CommentDetail>
                        <CardTitle fontSize="25px">{val.name}</CardTitle>
                        <TagTitle>{val.designation}</TagTitle>
                      </CommentDetail>
                    </CommentHeader>
                    <CommentText>
                      <Paragraph fontSize="14px" width="70%" margin="32px auto">
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. <br /> <br />
                        Et harum quidem rerum facilis est et expedita distinctio
                        libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit.
                      </Paragraph>
                    </CommentText>
                  </Comment>
                );
              })}
              {/* </div> */}
            </CommentCard>
          </CommentRow>
        ) : (
          <>
            <SectionHeading
              textAlign="center"
              fontSize="30px"
              marginBottom="20px"
              marginTop="20px"
              position="absolute"
              top="2%"
              left="40%"
              width="100%"

            >
              What People Says
            </SectionHeading>
            <Comment>
              <CommentHeader>
                <CommentImage>
                  <img
                    src={commentsData[activeComment].picture}
                    width={width <= 480 ? 90 : 120}
                    height={width <= 480 ? 90 : 120}
                  />
                </CommentImage>
                <CommentDetail>
                  <CardTitle>{commentsData[activeComment].name}</CardTitle>
                  <TagTitle>{commentsData[activeComment].designation}</TagTitle>
                </CommentDetail>
              </CommentHeader>
              <CommentText>
                <Paragraph
                  width={width <= 790 ? "100%" : "80%"}
                  // margin="30px auto"
                  margin={width <= 768 ? "8px auto" : "30px auto "}
                >
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. <br /> <br />
                  Et harum quidem rerum facilis est et expedita distinctio
                  libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit.
                </Paragraph>
              </CommentText>
            </Comment>
          </>
        )}

        <RoundBtn marginTop={width>=1400 ? "10%" :"12%"} onClick={() => scrollStart(50)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </RoundBtn>
        {width <= 768 && (
          <Slider>
            {commentsData.map((val, index) => {
              return (
                <DotSlider
                  background={`${
                    activeComment === index ? "#EC8845" : "#38181F"
                  }`}
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveComment(index);
                  }}
                />
              );
            })}
          </Slider>
        )}
      </CommentsWrapper>
    </>
  );
}

export default Comments;
