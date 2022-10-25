import React from "react";
import DripinTimer from "../../../components/DripinTimer";
import Paragraph from "../../../components/Paragraph";
import SectionHeading from "../../../components/SectionHeading";
import EarnCard from "./EarnCard";
import EarnCardsWrapper from "./EarnCardsWrapper";
import EarnTimeWrapper from "./EarnTimeWrapper";
import rock from "../../../assets/images/smallrock.png";
import Image from "next/image";
import RockImg from "./RockImg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import CircularProgress from "./CircularProgress";
import useWindowSize from "../../../hooks/useWindowSize";

function EarnTimer() {
  const percentage = 40.5;

  const {width}=useWindowSize();

  return (
    <>
      <EarnTimeWrapper>
        <DripinTimer/>
      </EarnTimeWrapper>
    </>
  );
}

export default EarnTimer;
