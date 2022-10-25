import React, { useState, useEffect } from "react";
import Functionality from "./Functionality";
import Success from "./Success";
import functionality from "../../../../assets/JsonData/functionality";
import Title from "../../../../components/Title";
import SubTitle from "../../../../components/SubTitle";
import Paragraph from "../../../../components/Paragraph";
import useWindowSize from "../../../../hooks/useWindowSize";
import DotSlider from "./DotSlider";
import Slider from "./Slider";

function FunctionalityHype() {
  const [functions, setFunctions] = useState(0);

  const { width } = useWindowSize();

  useEffect(() => {
    setTimeout(() => {
      if (functions > functionality.length - 2) {
        setFunctions(0);
      }
      else {

        setFunctions(functions + 1)

      }
    }, 2000);
  }, [functions]);

  return (
    <>
      <Functionality>
        <Title fontSize={width <= 480 ?  "50px" : width <= 992 ?  "30px":  "40px"} textAlign="center">
          Functionality <br /> Over Hype
        </Title>

        {width > 768 &&
          functionality.map((data, index) => {
            return (
              <Success key={index}>
                <Paragraph>{data.title}</Paragraph>
                <Title fontSize={width <= 480 ? "50px" : width <= 992 ? "40px": "40px"}>{data.value}</Title>
              </Success>
            );
          })}

        {width <= 768 && (
          <Success>
            <Paragraph>{functionality[functions].title}</Paragraph>
            <Title>{functionality[functions].value}</Title>
          </Success>
        )}

        {width <= 768 && (
          <Slider>
            {functionality.map((val, index) => {
              return (
                <DotSlider
                  background={`${functions === index ? "#FFFFFF" : "#000216"}`}
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setFunctions(index);
                  }}
                />
              );
            })}
          </Slider>
        )}
      </Functionality>
    </>
  );
}

export default FunctionalityHype;
