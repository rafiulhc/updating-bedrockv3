import React, { useEffect, useState, useLayoutEffect } from "react";
import SectionHeading from "../SectionHeading";
import Measure from "./Measure";
import Time from "./Time";
import Timer from "./Timer";
import TimerHeader from "./TimerHeader";
import TimerRow from "./TimerRow";
import Number from "./Number";
import DayRow from "./DayRow";
import useWindowSize from "../../hooks/useWindowSize";
import TimeWrap from "./TimeWrap";

import useMetaMask from "../../hooks/useMetaMask";
import axios from "axios";
import styled from "styled-components";
import TimerHead from "./TimerHead";

function DripinTimer() {
  const { connect, disconnect, isActive, account, isProvider } = useMetaMask();

  const [dripTime, setDripTime] = useState(null);
  const [check, setCheck] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    let myInterval: NodeJS.Timer | null = null;
    if (dripTime) {
      const timer = () => {
        setDripTime((n) => n - 1);
      };
      myInterval = setInterval(timer, 1000);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [dripTime]);

  useEffect(() => {
    const getDripTime = async () => {
      await axios
        .get(`http://localhost:3000/api/getBitcoinRewards`)
        .then((response) => {
          if (response && response.status === 201) {
            if (response.data.nextRelease) {
              console.log(response.data.nextRelease);

              setDripTime(
                Math.ceil((response.data.nextRelease - Date.now()) / 1000)
              );
            } else {
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDripTime();
  }, []);

  const secondsToHours = (seconds) => {
    if (seconds <= 0) {
      return "";
    }
    let timeLeft = "";
    let mutableSeconds = seconds;
    timeLeft = `${timeLeft} ${Math.floor(mutableSeconds / 86400)}`;
    mutableSeconds %= 86400;
    timeLeft = `${timeLeft} ${Math.floor(mutableSeconds / 3600)}`;
    mutableSeconds %= 3600;
    timeLeft = `${timeLeft} ${Math.floor(mutableSeconds / 60)}`;
    mutableSeconds %= 60;
    timeLeft = `${timeLeft} ${mutableSeconds} `;

    return timeLeft;
  };

  return (
    <>
      <TimerHeader>
        <Timer>
          <TimerHead>Bitcoin is dripping in</TimerHead>
          <br />
          <TimerRow>
            <TimeWrap>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Number marginRight="10px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[1].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[1].split("")[0]
                    : 0}
                </Number>
                <Number marginRight="15px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[1].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[1].split("")[1]
                    : 0}
                </Number>
                :
              </div>

              <Measure>Days</Measure>
            </TimeWrap>

            <TimeWrap>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Number marginRight="10px" marginLeft="15px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[2].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[2].split("")[0]
                    : 0}
                </Number>
                <Number marginRight="15px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[2].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[2].split("")[1]
                    : 0}
                </Number>
                :
              </div>
              {/* <br/> */}

              <Measure>Hours</Measure>
            </TimeWrap>

            <TimeWrap>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Number marginRight="10px" marginLeft="15px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[3].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[3].split("")[0]
                    : 0}
                </Number>
                <Number marginRight="15px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[3].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[3].split("")[1]
                    : 0}
                </Number>
                :
              </div>
              <Measure>Minutes</Measure>
            </TimeWrap>

            <TimeWrap>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Number marginRight="10px" marginLeft="15px">
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[4].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[4].split("")[0]
                    : 0}
                </Number>
                <Number>
                  {dripTime !== null &&
                  secondsToHours(dripTime).split(" ")[4].split("")[1]
                    ? secondsToHours(dripTime).split(" ")[4].split("")[1]
                    : 0}
                </Number>
              </div>

              <Measure>Seconds</Measure>
            </TimeWrap>
          </TimerRow>
        </Timer>
      </TimerHeader>
    </>
  );
}

export default DripinTimer;
