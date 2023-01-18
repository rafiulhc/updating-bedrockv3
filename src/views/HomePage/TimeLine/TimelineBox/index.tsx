import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Timeline from "../TimeLine";
import TimeLineTitle from "../TimeLine/TimeLineTitle";

const TimeLineBox = ({  }) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(95%,0)" },
    to: { transform: "translate(-95%,0)" },
    config: { duration: 18000 },
    reset: true,
    reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    }
  });

  return (
    <div style={{overflow: "hidden"}} key={key}>

      <animated.div style={scrolling}>

        <Timeline />
        </animated.div>
    </div>
  );
};

export default TimeLineBox;