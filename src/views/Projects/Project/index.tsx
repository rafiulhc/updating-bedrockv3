import Image from "next/image";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../../components/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import ProjectIcons from "./ProjectIcons";
import ProjectLogo from "./ProjectLogo";
import ProjectTitle from "./ProjectTitle";
import star from "../../../assets/images/star.png";
import heart from "../../../assets/images/heart.png";
import bitcoin from "../../../assets/images/bitcoin.png";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Funds from "./Funds";
import Icon from "./Icon";
import ProjectImage from "./ProjectImage";
import ProjectData from "./ProjectData";
import Progress from "./Progress";
import CardTitle from "../../../components/CardTitle";
import ProjectTag from "./ProjectTag";
import ProjectFooter from "./ProjectFooter";
import Button from "../../../components/Button";
import BarWrapper from "./BarWrapper";
import youtube from "../../../assets/images/youtube.png";

import { ProgressBar } from "react-bootstrap";
import RoundBtn from "../../../components/RoundBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../../hooks/useWindowSize";
import ProjectView from "../ProjectView/index";
import { Container, Row, Col, Button as BButton } from "react-bootstrap";
import {
  useBedrockProjectContract,
  useBusdContract,
} from "../../../hooks/useContract";

import styled from "styled-components";
import contracts from "../../../config/constants/contracts";

const ViewButton = styled(BButton)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  border: none;
  height: 40px;
  width: 100px;
  color: #ffffff;
  background: #ec8845;
  border-radius: 60px;
  border-color: #ec8845;

  :hover {
    background: #ec8845;
    opacity: 0.5;
  }
  :focus {
    background: #ec8845;
    border-color: #ec8845;
    box-shadow: none;
  }
`;

function Project(props: any) {
  const { width } = useWindowSize();
  const { project, data } = props;
  
  const [ventureState, setVentureState] = useState("");
  const [viewDetails, setViewDetails] = useState(false);

  const [remainingVentureTime, setRemainingVentureTime] = useState({
    months: 0,
    days: 0,
  });

  const [balance, setBalance] = useState(0);
  const busdContract = useBusdContract();
  console.log("contr: ", project?.contract);

  const projectContract = useBedrockProjectContract(project?.contract);
  console.log("pro contrr: ", projectContract);
  // console.log("BU: ",busdContract);

  useEffect(() => {
    async function getBalanceAmount() {
      console.log("BU: ",busdContract);

      const myBalance = busdContract.signer!==null && await busdContract.balanceOf(project?.contract);
      // const myBalance = await busdContract.balanceOf(project?.contract);

      console.log("balance :",myBalance);
      
      const newBalance = parseInt(myBalance?._hex) / 10 ** 18;

      setBalance(newBalance);
    }
    getBalanceAmount();

    const getVentureState = async () => {
      const depoState = await projectContract?.ventureState();

      setVentureState(depoState);
    };
    getVentureState();
  }, [busdContract, project?.contract, projectContract]);
  useEffect(() => {
    const getRemainingTime = async () => {
      const raisetime = await projectContract?.raiseAcheivedTime();
      const venturetime = await projectContract?.ventureTime();
      let remainingSeconds;
      if (parseInt(raisetime) === 0) {
        remainingSeconds = venturetime;
      } else {
        remainingSeconds =
          venturetime - (Math.floor(Date.now() / 1000) - parseInt(raisetime));
      }

      if (remainingSeconds > 0) {
        let minute = Math.floor(remainingSeconds / 60);
        remainingSeconds %= 60;
        let hour = Math.floor(minute / 60);
        minute %= 60;
        let days = Math.floor(hour / 24);
        hour %= 24;
        let months = Math.floor(days / 30);
        days %= 30;
        months %= 12;
        setRemainingVentureTime({ months, days });
      } else {
        setRemainingVentureTime({ months: 0, days: 0 });
      }
    };
    getRemainingTime();
  }, [projectContract]);

  return (
    <>
      {ventureState!=="ACCEPTING_INVESTMENTS" && <ProjectCard>
        <ProjectHeader>
          <ProjectLogo></ProjectLogo>
          <ProjectTitle>
            {project?.title}

            <ProjectTag>solarleads.co</ProjectTag>
          </ProjectTitle>
          <ProjectIcons>
            <Icon>
              <Image src={heart} />
            </Icon>
            <Icon>
              <Image src={star} />
            </Icon>
          </ProjectIcons>
        </ProjectHeader>
        <ProjectImage>
          <Image
            width={260}
            height={230}
            src={
              project?.logo?.startsWith("data:image") ? project?.logo : bitcoin
            }
          />
        </ProjectImage>
        <ProjectData>
          <Progress>
            <ProjectTag>Fund Raising</ProjectTag>
            <BarWrapper>
              {ventureState === "PENDING_COLLATERAL" && (
                <ProgressBar striped animated variant="warning" now={0} />
              )}
             
               {ventureState === "RAISE_PULLED" ||
              ventureState?.includes("ENDED") ? (
                <ProgressBar striped animated variant="warning" now={100} />
              )
               : 
              (
                <ProgressBar
                  striped
                  animated
                  variant="warning"
                  now={Math.ceil((balance / project?.raisegoal) * 100)}
                />
              )
              }



            </BarWrapper>
          </Progress>
          <Row>
            <Col xs={4}>
              <ProjectTag>Raising</ProjectTag>
              <Funds>${project?.raisegoal}</Funds>
            </Col>
            <Col xs={4}>
              <ProjectTag>Interest</ProjectTag>
              <Funds>{project?.returnpercentage}%</Funds>
            </Col>
            <Col xs={4}>
              {ventureState !== "PENDING_COLLATERAL" && (
                <>
                  <ProjectTag>Raised</ProjectTag>
                  <Funds>
                    {" "}
                    {ventureState === "RAISE_PULLED" ||
                    ventureState?.includes("ENDED")
                      ? "FULLY FUNDED"
                      : `$${Math.ceil(balance)}`}
                  </Funds>
                </>
              )}
            </Col>
            <Col xs={12}>
              <ProjectTag>Term</ProjectTag>
              <Funds>
              {ventureState?.includes('ENDED')
                ? 'Ended'
                : remainingVentureTime.months !== 0
                ? ` ${remainingVentureTime.months} months & ${remainingVentureTime.days} days Remaining`
                : `${remainingVentureTime.days} days Remaining`}
              </Funds>
            </Col>
          </Row>
          <Row>
            <ProjectTag>Description</ProjectTag>
            <ProjectTag>{project?.description}</ProjectTag>
          </Row>
          <ProjectFooter>
            <ViewButton onClick={() => setViewDetails(true)}>
              View Details
            </ViewButton>
            <Button width="100px" height="40px" fontSize="12px" position="static">
              See Video
              <Image width={20} height={15} src={youtube} />
            </Button>
          </ProjectFooter>
        </ProjectData>
      </ProjectCard>}
      
      {viewDetails && (
        <ProjectView
          project={project}
          show={viewDetails}
          onHide={() => setViewDetails(false)}
        />
      )}
    </>
  );
}

export default Project;
