import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";
import Project from "./Project";
import ProjectWrapper from "./ProjectWrapper";
import Funding from "./Funding";
import { Row, Col, Container } from "react-bootstrap";
import ProjectHeader from "./Project/ProjectHeader";
import Investments from "./Investments";
import Footer from "../../components/Footer";
import SectionHeading from "../../components/SectionHeading";
import ActiveProjects from "./ActiveProjects";
import Active from "./Active";
import ProjectModal from "./ProjectModal";
import projectsData from "../../assets/JsonData/projectsData";
import ProjectData from "./Project/ProjectData";
import useWindowSize from "../../hooks/useWindowSize";
import FinishedProjects from "./FinishedProjects";
import ProjectScroll from "./ProjectScroll";
import Slider from "./Slider";
import DotSlider from "./DotSlider";
import ImageBackground from "../HomePage/Hero/HeroBanner/ImageBackground";
import useMetaMask from "../../hooks/useMetaMask";
import NeedsFund from "./NeedsFund/";

function Projects({ projects }) {
  const { account, library } = useMetaMask();
  const [projectDisplay, setProjectDisplay] = useState(Math.floor(10 / 4));
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);

  const [projectLimit, setProjectLimit] = useState(5);
  const [activeProject, setActiveProject] = useState(null);
  const [finishedProject, setFinishedProject] = useState(0);

  const [myProjects, setMyProjects] = useState([]);
  const [closedProjectsWithProfit, setClosedProjectsWithProfit] = useState([]);
  const [communityProjects, setCommunityProjects] = useState([]);
  const [needFundingProjects, setNeedFundingProjects] = useState([]);
  const [activePro, setActivePro] = useState(0);

  const [closedProjectsWithLoss, setClosedProjectsWithLoss] = useState([]);
  const [fetching, setFetching] = useState("Loading...");

  const showPro = projectsData.slice(0, projectLimit);
  const { width } = useWindowSize();

  const router = useRouter();
  const API =
    router.basePath === "localhost"
      ? "http://localhost:8080"
      : "https://bedrock-backend.vercel.app";
  const data = projects.projects;



  useEffect(() => {
    if (data.length === 0) {
      setFetching("No projects to show!");
    }

  


    const filteredCommunity = data.filter(
      (project: { venturestate: string; address: string }) => {
        return (
          project.venturestate &&
          !project.venturestate.toLowerCase().includes("ended") &&
          (!account || account.toLowerCase() !== project.address.toLowerCase())
        );
      }
    );
    setCommunityProjects(filteredCommunity);

    const filteredNeedsFunding = data.filter(
      (project: { venturestate: string; address: string }) => {
        return (
          project.venturestate &&
          !project.venturestate.toLowerCase().includes("ended") &&
          (!account || account.toLowerCase() !== project.address.toLowerCase())
        );
      }
    );

    setNeedFundingProjects(needFundingProjects);

    const filteredClosed = data.filter(
      (project: { venturestate: string; address: string }) => {
        return (
          project.venturestate &&
          project.venturestate.toLowerCase().includes("ended_with_profit") &&
          (!account || project.address !== account.toLowerCase())
        );
      }
    );
    setClosedProjectsWithProfit(filteredClosed);

    const filteredClosed2 = data.filter(
      (project: { venturestate: string; address: string }) => {
        return (
          project.venturestate &&
          project.venturestate.toLowerCase().includes("ended_with_loss") &&
          (!account || project.address !== account.toLowerCase())
        );
      }
    );
    setClosedProjectsWithLoss(filteredClosed2);
  }, [API, account]);

  return (
    <>
      <Navbar />
      <ProjectWrapper>
        <Title
          zIndex="1"
          position="relative"
          fontWeight="700"
          textAlign="center"
          fontSize={width > 768 ? "100px" : width > 480 ? "70px" : "50px"}
        >
          Start a {width < 480 && <br />} Project with {width < 480 && <br />}
          {width > 786 && <br />}
          Bedrock {width < 480 && <br />} Finance
        </Title>
        <ImageBackground
          Width="30%"
          height="100%"
          background="rgba(236, 136, 69, 0.5) "
          top="30px"
          right="5%"
        />
        <ImageBackground
          Width="200px"
          height="200px"
          background=" #893242 "
          top={width > 786 ? "450px" : "250px"}
          left="20px"
        />
        <Button
          width={width < 480 && "247px"}
          marginTop="40px"
          position="relative"
          outline
          onClick={() => setShowProjectModal(true)}
        >
          Start Project
        </Button>
      </ProjectWrapper>

      <Funding marginTop={width > 480 ? "130px" : "30px"}>
        <SectionHeading
          fontSize={width > 786 ? "50px" : width > 486 ? "40px" : "40px"}
          marginBottom="25px"
        >
          Projects that {width < 480 && <br />} need funding
        </SectionHeading>
        <Container fluid>
          <Row>
            {communityProjects.length > 0 &&
              communityProjects.map((project, index) => {
                
                return (
                  <>
                      <NeedsFund data={data} project={project} />
                  </>
                );
              })}
          </Row>
        </Container>
      </Funding>

      <Funding marginTop={width > 480 ? "130px" : "30px"}>
        <SectionHeading
          fontSize={width > 786 ? "50px" : width > 486 ? "40px" : "40px"}
          marginBottom="30px"
        >
          Active Projects
        </SectionHeading>
        {width >= 768 ? (
          <Container >
            <Row>
              {communityProjects.length > 0 && communityProjects.map((project, index) => {
                return (
                  <>
                    {/* <Col key={index} > */}
                      <Project data={data} project={project} />
                    {/* </Col> */}
                  </>
                );
              })}
            </Row>
          </Container>
        ) : (
          <Container fluid >
            <Row>
              <Col>
                <Project project={communityProjects[activePro]} />
              </Col>
              {width <= 768 && (
                <Slider>
                  {communityProjects.length > 0 &&
                    communityProjects.map((val, index) => {
                      return (
                        <DotSlider
                          background={`${
                            activePro === index ? "#EC8845" : "#38181F"
                          }`}
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            setActivePro(index);
                          }}
                        />
                      );
                    })}
                </Slider>
              )}
            </Row>
          </Container>
        )}
      </Funding>

    
      <ActiveProjects>
        <SectionHeading
          fontSize={width > 480 ? "50px" : "30px"}
          marginBottom="20px"
        >
          Finished Projects
        </SectionHeading>

        <ProjectScroll>
          {closedProjectsWithProfit.length > 0 &&
            closedProjectsWithProfit.map((project, index) => {
              return <Project  data={data} project={project} key={index} />;
            })}
        </ProjectScroll>
      </ActiveProjects>

{
account && 
 <Investments data={data} />

}


      <Footer />
      {showProjectModal && (
        <ProjectModal
          show={showProjectModal}
          onHide={() => setShowProjectModal(false)}
        />
      )}
    </>
  );
}

export default Projects;
