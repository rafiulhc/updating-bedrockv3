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
import useTimer from "../../hooks/useTimer";
import useFetchdata from "../../hooks/useFetchdata";
import Button from "../Button";

function DripinTimer() {

  const { width } = useWindowSize();
  const [dripTime, setDripTime]  = useTimer();
  const [ currentTime, setCurrentTime ] = useState();
  const [
    unclaimedBTCAmount, setUnclaimedBTCAmount, claimableRock, setClaimableRock, nextDripTime, setNextDripTime, claimableBitcoin,
    setClaimableBitcoin, investedRock, setInvestedRock, poolBitcoin, setPoolBitcoin, poolRock, setPoolRock, userRockBalance,
    setUserRockBalance, depositAmount, setDepositAmount, withdrawalAmount, setWithdrawalAmount, nextDripValue, setNextDripValue,
     myPoolShare, setMyPoolShare, unclaimRockAmount, setUnclaimRockAmount, rockSlideCount, setRockSlideCount,
    userShare, setUserShare, bitcoinInterval, setBitcoinInterval, totalPoolRock, setTotalPoolRock, bitcoinDripNextRelease,
    setBitcoinDripNextRelease, fetchStakeData
] = useFetchdata();

  const secondsToHours = (seconds) => {
    if (seconds <= 0) {
      if (bitcoinDripNextRelease > (Math.floor(new Date().getTime() / 1000))){
        setDripTime(bitcoinDripNextRelease - (Math.floor(new Date().getTime() / 1000)))
      }else{
        setDripTime(0)
      }
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
                    : secondsToHours(dripTime).split(" ")[2].split("")[0]}
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
                    : secondsToHours(dripTime).split(" ")[3].split("")[0]}
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
                    : secondsToHours(dripTime).split(" ")[4].split("")[0]
                    }
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
