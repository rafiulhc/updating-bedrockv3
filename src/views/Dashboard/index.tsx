import React, { useState, useEffect } from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import {
  Container as BContainer,
  Col as BCol,
  Row as BRow,
} from "react-bootstrap";
import useTheme from "../../hooks/useTheme";
//import { Flex, Button as BButton } from "@pancakeswap/uikit";
import axios from "axios";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import ProjectDetailModal from "./projectDetailModal/index";
import PageLoader from "../../components/Loader/CircleLoader";
import waveBG from "./utils/wave1Light.svg";
import waveBG1 from "./utils/waveBottomUpDark.svg";
import Admin from "./Admin/index";

interface StyledProps {
  isDark?: boolean;
  isMobile?: boolean;
  show?: boolean;
  bgImg?: any;
}

const BGround = styled.div`
  background-image: ${({ bgImg }: StyledProps) =>
    bgImg ? `url(${bgImg[0]}) , url(${bgImg[1]})` : ""};
  background-repeat: no-repeat, no-repeat;
  background-size: cover;
  background-position: bottom;
`;

const Container = styled(BContainer)`
  padding: 0px;
  width: 100%;
`;
const Row = styled(BRow)`
  margin: ${({ isMobile }: StyledProps) => (isMobile ? "0" : "auto")};
  padding: ${({ isMobile }: StyledProps) => (isMobile ? "0" : "auto")};
`;
const Col = styled(BCol)`
  min-height: ${({ isMobile }: StyledProps) =>
    isMobile ? "calc(100vh - 204px);" : "calc(100vh - 267px);"};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderCol = styled(BCol)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  margin-top: ${({ isMobile }: StyledProps) => (isMobile ? "50px" : "auto")};
  scroll-behavior: smooth;
  overflow-x: ${({ isMobile }: StyledProps) =>
    isMobile ? "scroll" : "hidden"};
}
`;
const FlexCol = styled.div`
  min-height: ${({ isMobile }: StyledProps) =>
    isMobile ? "calc(100vh - 204px);" : "calc(100vh - 267px);"};
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: auto;
  flex: 1;
  flex-wrap: wrap;
  margin-top: ${({ isMobile }: StyledProps) => (isMobile ? "0px" : "auto")};
`;
const Card = styled.div`
  width: ${({ isMobile }: StyledProps) => (isMobile ? "100%" : "90%")};
  height: ${({ isMobile }: StyledProps) => (isMobile ? "500px" : "300px")};
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: #874452;
  border-radius: 20px;
  outline: none;
  border: none;
  z-index: 1;
  box-shadow: 0;
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: 0 0 20px #000;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  height: 20%;
  width: 100%;
  padding: 30px;
  justify-content: ${({ isMobile }: StyledProps) =>
    isMobile ? "center" : "flex-start"};
  align-items: ${({ isMobile }: StyledProps) =>
    isMobile ? "center" : "center"};
  background-color: #000;
  border-radius: 20px 20px 0px 0px;
`;
const Title = styled.h3`
  font-size: 28px;
  color: #fff;
`;
const DetailContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${({ isMobile }: StyledProps) => (isMobile ? "100%" : "80%")};
  flex-direction: column;
  justify-content: space-around;
  padding: 5px 30px;
`;
const Data = styled.div`
  font-size: 15px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isMobile }: StyledProps) =>
    isMobile ? "column" : "row"};
`;
const DataValues = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: ${({ isMobile }: StyledProps) => (isMobile ? "10px" : "0px")};
`;
const Description = styled.div`
  font-size: 15px;
  color: #fff;
  display: flex;
`;
const Subheader = styled.a`
  margin: ${({ isMobile }: StyledProps) => (isMobile ? "10px" : "20px")};
  cursor: pointer;
  color: #000;
  font-size: ${({ isMobile }: StyledProps) => (isMobile ? "18px" : "20px")};
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  text-transform: capitalize;
  &:hover {
    border-bottom: 2px solid #000;
    color: #000;
  }
`;
const Button = styled.button`
  margin: 0px 10px;
  padding: 0px 30px;
  color: #783d44;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 100%;
  background: #e8955b99;
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 15px;
  color: #fff;
  margin: 5px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #ffffff88;
    font-size: 15px;
  }
  :-ms-input-placeholder {
    color: #ffffff88;
  }
`;
const Dashboard = () => {
  const { isMobile } = useTheme();
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [merchRequest, setMerchRequest] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [show, setShow] = useState("pending");
  const [projectData, setProjectData] = useState(null);
  const { library } = useActiveWeb3React();
  const router = useRouter();

  // eslint-disable-next-line no-restricted-globals
  const API =
  (router as any).hostname === "localhost"
      ? "http://localhost:8080"
      : "https://bedrock-backend.vercel.app";

  const state = {
    pending: "pending",
    deployed: "deployed",
    approved: "approved",
    closed: "closed",
    merch: "merch",
    admins: "admins",
  };

  useEffect(() => {
    async function data() {
      await axios
        .get(`api/getProjects`)
        .then((res) => {
          setLoader(true);
          const deletenull = res.data.projects.filter(
            (person: { status: string }) => {
              return person.status;
            }
          );
          const filteredPending = deletenull.filter(
            (person: { status: string }) => {
              return person.status.toLowerCase().includes(state.pending);
            }
          );
          setSelectedProjects(deletenull);
          setDisplayProjects(filteredPending);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    data();
  }, [API, state.pending]);

  useEffect(() => {
    const getMerchData = async () => {
      await axios
        .get(`api/getMerchRequests`)
        .then((res) => {
          setMerchRequest(res.data.merchrequests);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMerchData();
  }, [API]);

  function setDisplay(e) {
    const filtered = selectedProjects.filter(
      (person: { status: string | null }) => {
        return person.status.toLowerCase().includes(e);
      }
    );
    setDisplayProjects(filtered);
    setShow(e);
  }

  function displayCard(e) {
    setProjectData(e);
    setShowModal(true);
  }

  async function decision(e, id) {
    e.stopPropagation();
    setShowModal(false);
    const data = {
      id,
      status: e.target.name,
    };
    await axios
      .post(`api/postApproval`, data)
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));

    setShowModal(false);
  }
  async function funding(e, id, status) {
    e.stopPropagation();
    setShowModal(false);
    const data = {
      id,
      status: !status,
    };
    await axios
      .post(`api/postFunding`, data)
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));

    setShowModal(false);
  }

  async function UpdateMerchRequest(item) {
    await axios
      .post(`api/postUpdateMailedStatus`, { id: item._id })
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <BGround bgImg={[waveBG, waveBG1]}>
      <Container isMobile={isMobile} fluid>
        <Row isMobile={isMobile}>
          <HeaderCol isMobile={isMobile}>
            <div>
              {Object.values(state).map((item, index) => {
                return (
                  <Subheader
                    onClick={() => setDisplay(item)}
                    isMobile={isMobile}
                    key={index}
                    style={
                      show === item
                        ? { color: "#874452" }
                        : { color: "#280d5f" }
                    }
                  >
                    {item}{" "}
                    {item === "merch"
                      ? "Requests"
                      : item === "admins"
                      ? null
                      : "Projects"}
                  </Subheader>
                );
              })}
            </div>
          </HeaderCol>
        </Row>
        <Row isMobile={isMobile}>
          {show !== state.merch ? (
            <Row style={{ zIndex: "1" }}>
              {loader ? (
                <>
                  {show === state.admins ? (
                    <Admin />
                  ) : displayProjects.length !== 0 ? (
                    <FlexCol isMobile={isMobile}>
                      {displayProjects?.map((item, index) => {
                        return (
                          <Card isMobile={isMobile} key={index}>
                            <TitleContainer
                              isMobile={isMobile}
                              onClick={(e) => displayCard(item)}
                            >
                              <Title>
                                {item.title}{" "}
                                <span
                                  style={{ color: "grey", fontSize: "20px" }}
                                >
                                  {" "}
                                  - by {item.firstname}
                                </span>
                              </Title>
                            </TitleContainer>
                            <DetailContainer
                              isMobile={isMobile}
                              onClick={(e) => displayCard(item)}
                            >
                              <Description>
                                <p style={{ fontSize: "18px" }}>
                                  {item.description}
                                </p>
                              </Description>
                              <Data isMobile={isMobile}>
                                <DataValues isMobile={isMobile}>
                                  Raising {item.raisegoal}$
                                </DataValues>
                                <DataValues isMobile={isMobile}>
                                  {item.returnpercentage}% return rate{" "}
                                </DataValues>
                                <DataValues isMobile={isMobile}>
                                  {item.term} months period{" "}
                                </DataValues>
                                <DataValues isMobile={isMobile}>
                                  {" "}
                                  See KYC{" "}
                                </DataValues>
                                <DataValues isMobile={isMobile}>
                                  {" "}
                                  View Photo ID
                                </DataValues>
                              </Data>
                              <div style={{ justifyContent: "center" }}>
                                {show === state.pending ? (
                                  <>
                                    <Button
                                      // variant="light"
                                      name={state.approved}
                                      onClick={(e) => decision(e, item._id)}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      // variant="light"
                                      name={state.closed}
                                      onClick={(e) => decision(e, item._id)}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : show === state.approved ? (
                                  <>
                                    <Button
                                      // variant="light"
                                      name="pause"
                                      onClick={(e) =>
                                        funding(e, item._id, item.funding)
                                      }
                                    >
                                      {item.funding
                                        ? "Unpause Funding"
                                        : "Pause Funding"}
                                    </Button>
                                    <Button
                                      // variant="light"
                                      name={state.closed}
                                      onClick={(e) => decision(e, item._id)}
                                    >
                                      Remove Listing
                                    </Button>
                                  </>
                                ) : null}
                              </div>
                            </DetailContainer>
                          </Card>
                        );
                      })}
                    </FlexCol>
                  ) : (
                    <Col>
                      <div>
                        <h1>No {show} projects</h1>
                      </div>
                    </Col>
                  )}
                </>
              ) : (
                <Col>
                  <div>
                    <PageLoader />
                  </div>
                </Col>
              )}
            </Row>
          ) : (
            <Row isMobile={isMobile}>
              {merchRequest.length === 0 ? (
                <Col style={{ zIndex: "1" }}>
                  <div>
                    <h1>No Merch Requests</h1>
                  </div>
                </Col>
              ) : (
                <FlexCol isMobile={isMobile}>
                  {merchRequest.map((item, index) => {
                    return (
                      <Card show isMobile={isMobile} key={index}>
                        <TitleContainer isMobile={isMobile} show>
                          <Title>{item.rewardType}</Title>
                        </TitleContainer>
                        <DetailContainer isMobile={isMobile}>
                          <Input
                            type="text"
                            // @ts-ignore
                            placeholder={`Address: ${item.address}`}
                            // @ts-ignore
                            disabled
                            style={{
                              backgroundColor: "#ffffff33",
                              border: "1px solid #fff",
                              pointerEvents: "none",
                            }}
                          />
                          <Data isMobile={isMobile}>
                            <DataValues isMobile={isMobile}>
                              {item.mailed
                                ? "The reward has been shipped!"
                                : item.mailingaddress
                                ? `The mailing address is: ${item.mailingaddress}`
                                : "Awaiting user's input for mailing address."}
                            </DataValues>
                          </Data>
                          <div style={{ justifyContent: "center" }}>
                            {!item.mailed && (
                              <Button
                                // variant="light"
                                onClick={(e) => {
                                  UpdateMerchRequest(item);
                                }}
                                disabled={item.mailingaddress == null}
                              >
                                Approve
                              </Button>
                            )}
                          </div>
                        </DetailContainer>
                      </Card>
                    );
                  })}
                </FlexCol>
              )}
            </Row>
          )}
        </Row>

        <ProjectDetailModal
          data={projectData}
          show={showmodal}
          onHide={() => setShowModal(false)}
        />
      </Container>
    </BGround>
  );
};
export default Dashboard;
