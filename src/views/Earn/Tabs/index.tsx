import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import useWindowSize from "../../../hooks/useWindowSize";
import styled from "styled-components";
import { Card, InputField } from "../../Swap/components/index";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import useMetamask from "../../../hooks/useMetaMask";

import {
  useBitcoinStakingContract,
  useBtcbContract,
  useBedrockContract,
  useBtcbDripContract
} from "../../../hooks/useContract";

const NewTabsSection = styled.div`
  display: grid;
  place-items: center;
  margin: 0 3%;
`;

const NewTabsContainer = styled.div`
  width: 100%;
  max-width: 963px;
  overflow: hidden;
`;

const NewTabsHeaderScrollContainer = styled.div`
  width: 100%;
  max-width: 963px;
  overflow: auto;

  &::-webkit-scrollbar {
      background:transparent;
      width:5px;
    };
  &::-webkit-scrollbar-thumb {
      background: transparent;
  };
`

const NewTabsHeader = styled.div`
  width: 100%;
  min-width: 550px;
  max-width: 763px;
  margin-bottom: 10px;
  display: flex;
`;

interface INewTabsLink {
  selected: boolean;
}
const NewTabsLink = styled.div<INewTabsLink>`
  box-sizing: border-box;
  flex: 1 0 25%;
  padding: 16px;
  text-align: center;
  color: ${({ selected }) => (selected ? "#E98331" : "#ffffff")};
  border-bottom: ${({ selected }) => (selected ? "1px solid #E98331" : "none")};

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
const NewTabsCardContainers = styled.div`
  margin-top: 50px;
`
const BalanceText = styled.div`
  padding: 5px;
  opacity: 0.75;

  @media (max-width: 768px) {
    display: none;
  }
`
const BalanceTextMobile = styled.div`
  display: none;
  padding: 5px;
  color: #ffffff;
  opacity: 0.75;

  @media (max-width: 768px) {
    display: block;
  }
`

function Tabs() {
  const TabsArray = ["Deposit", "Withdraw", "Claim Bitcoin", "Claim Rock", "Rock Slide"];
  const [activeTab, setActiveTab] = useState(0);
  const [claimState, setClaimState] = useState("");
  const [claimableRock, setClaimableRock] = useState(0);
  const [claimableBitcoin, setClaimableBitcoin] = useState(0);
  const [investedRock, setInvestedRock] = useState(0);
  const [userRockBalance, setUserRockBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositState, setDepositState] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalState, setWithdrawalState] = useState("");
  const [distributeState, setDistributeState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ isMax, setIsMax ] = useState(false);
  const { account } = useMetamask();
  const btcContract = useBtcbContract();
  const rockContract = useBedrockContract();
  const btcbDripContract = useBtcbDripContract();
  const router = useRouter();


  useEffect(() => {
    const fetchStakeData = async () => {
      if (account) {
        await btcbDripContract.functions.unclaimedRock(account).then((res) => {
          setClaimableRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await btcbDripContract.functions.rockStakes(account).then((res) => {
          setInvestedRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await rockContract.functions.balanceOf(account).then((res) => {
          setUserRockBalance(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await btcbDripContract.functions.rockStakes(account).then((res) => {
          setWithdrawalAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await btcbDripContract.functions.unclaimedBTC(account).then((res) => {
          setClaimableBitcoin(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
      }
    }

    fetchStakeData();
  }, [
    account,
    btcbDripContract.functions,
    btcContract.functions,
    rockContract.functions,
    btcbDripContract.address,
  ]);


  const stakeRock = async () => {
    setIsModalOpen(true);
    setDepositState(`Staking ${depositAmount} ROCK`);
    // alert("step 1 of 2")
    if (!depositAmount || depositAmount <= 0) {
      return;
    }

    try {
      setDepositState(`Step 1 of 2: Approving ROCK spend...`);

      await rockContract.functions
        .approve(
          btcbDripContract.address,
          new BigNumber(depositAmount).multipliedBy(10 ** 18).toFixed()
        )
        .then(async (data) => {

          await data.wait();
          setDepositState(`Step 2 of 2: Staking ROCK... please confirm transaction`);

          await btcbDripContract.functions
            .stakeRock(
              new BigNumber(depositAmount).multipliedBy(10 ** 18).toFixed()
            )
            .then(async (data2) => {
              setDepositState(`please wait for successful transaction confirmation`);
              setDepositState(`Staking ROCK Successful!`);
              await data2.wait();

              window.location.href = "/earnbitcoin";
              setIsModalOpen(false);
            });
        });
    } catch (error) {
      setDepositState(`Errored!`);
      console.log(error);
    }
  };


  const withdrawRock = async () => {
    setWithdrawalState("Step 1 of 1: Withdrawing...");
    if (!withdrawalAmount || withdrawalAmount <= 0) {
      alert("No rock to withdraw")
      return;
    }
    try {
      await btcbDripContract.functions
        .withdrawRock(
          new BigNumber(withdrawalAmount).multipliedBy(10 ** 18).toFixed()
        )
        .then(async (data) => {
          await data.wait();

        });
    } catch (error) {
      setWithdrawalState("Errored!");
      console.log(error);
    }
  };


  const claimBitcoin = async () => {

    if (!claimableBitcoin || claimableBitcoin <= 0) {
      return;
    }

    setClaimState(`Step: Claiming Rock...`);

    try {
          await btcbDripContract.functions.claimBTCDrip().then(async (data2) => {
            await data2.wait();
          });
    } catch (error) {
          setWithdrawalState("Errored!");
          console.log(error);
    }
  };

  /* const claimRock = async () => {
    const res = await axios.get(
      `https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
    );
    const bnbPriceUsd = parseInt(res.data.data.price);

    if (claimableRock <= 0) {
      return;
    }

    setClaimState(`Step 1 of 2: Sending claim fee...`);

    const oneDollarBnb = new BigNumber(1).dividedBy(
      parseInt(bnbPriceUsd.toFixed())
    );

    const tx = {
      to: modWallet,
      value: ethers.utils.parseEther(oneDollarBnb.toFixed(10)),
    };
    library
      .getSigner()
      .sendTransaction(tx)
      .then(async (data) => {
        await data.wait();
        setClaimState(`Step 2 of 2: Claiming Rock...`);

        try {
          await btcbDripContract.functions.claimRock().then(async (data2) => {
            await data2.wait();
          });
        } catch (error) {
          setWithdrawalState("Errored!");
          console.log(error);
        }
      });
  }; */


  const claimRock = async () => {

    if (claimableRock <= 0) {
      return;
    }

    setClaimState(`Step: Claiming Rock...`);

    try {
          await btcbDripContract.functions.claimRock().then(async (data2) => {
            await data2.wait();
          });
    } catch (error) {
          setWithdrawalState("Errored!");
          console.log(error);
    }

  };

  const rockSlide = async () => {
    if (claimableRock <= 0) {
      return;
    }

    setClaimState(`Step: Sliding Rock...`);

    try {
          await btcbDripContract.functions.reInvestRock().then(async (data2) => {
            await data2.wait();
          });
    } catch (error) {
          setWithdrawalState("Errored!");
          console.log(error);
    }
  };

  const setMax  = async () => {
    setDepositAmount(userRockBalance);
    setWithdrawalAmount(investedRock);
    setIsMax(true);
  };

  // distributeBTCB among holders . can be called by anyone
  const distributeBTCB = async () => {

    try {
          await btcbDripContract.functions.distributeBitcoin().then(async (data2) => {
            await data2.wait();
          });
    } catch (error) {
          setDistributeState("Errored!");
          console.log(error);
      }
    };




  const [isClaim, setIsClaim] = useState(false);
  // useEffect(() => {
  //   if (activeTab === 2 || activeTab === 3) {
  //     if (isClaim !== true) {
  //       setIsClaim(true);
  //     }
  //   } else {
  //     if (isClaim !== true) {
  //       setIsClaim(false);
  //     }
  //   }
  // }, [activeTab])

  return (
    <>
         <NewTabsSection>
        <NewTabsContainer>

          <NewTabsCardContainers>
          {isModalOpen && (
    <Card height="140px">
     <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
           }}
         >
           <h3 style={{color:"white", margin:"15px"}}>{depositState}</h3>
         </div>
     </Card>
   )}

          </NewTabsCardContainers>
        </NewTabsContainer>
      </NewTabsSection>

      <NewTabsSection>
        <NewTabsContainer>
          <NewTabsHeaderScrollContainer>
            <NewTabsHeader>
              {TabsArray.map((val, index) => (
                <NewTabsLink
                  selected={TabsArray[activeTab] === val}
                  key={val}
                  onClick={() => {
                    if (index === 2 || index === 3 || index === 4) {
                      setIsClaim(true);
                    } else setIsClaim(false);
                    setActiveTab(index)
                  }}
                >
                  {val}
                </NewTabsLink>
              ))}
            </NewTabsHeader>
          </NewTabsHeaderScrollContainer>
          <NewTabsCardContainers>
            <Card height="280px">
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                }}
              >
                {(isClaim && TabsArray[activeTab] === "Claim Bitcoin") && (
                  <div>
                    <h1 style={{ color: 'white' }}>{claimableBitcoin.toFixed(8)}</h1>
                  </div>
                )}
                {(isClaim && TabsArray[activeTab] === "Claim Rock") && (
                  <div>
                    <h1 style={{ color: 'white' }}>{claimableRock.toFixed(2)}</h1>
                  </div>
                )}
                {(isClaim && TabsArray[activeTab] === "Rock Slide") && (
                  <div>
                    <h1 style={{ color: 'white' }}>{claimableRock.toFixed(2)}</h1>
                  </div>
                )}
                {(!isClaim) && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      padding: "0 10%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "10px",
                        color: "#ffffff",
                      }}
                    >
                      <div>Enter Amount to {TabsArray[activeTab]}</div>
                      <BalanceText>Balance: {userRockBalance.toFixed(0)} ROCK</BalanceText>
                    </div>
                    <div>
                    {!isMax && (
                        <InputField
                        readonly={false}
                        type={"number"}
                        onChange={(ev) => setDepositAmount(parseInt(ev))}
                      />
                    )}
                      {(isMax && TabsArray[activeTab] === "Deposit") && (
                       <div onChange={()=> setIsMax(false)}>
                        <InputField  value ={String(userRockBalance)} />
                        </div>
                      )}
                      {(isMax && TabsArray[activeTab] === "Withdraw") && (
                        <div onChange={()=> setIsMax(false)}>
                        <InputField value ={String(investedRock)} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Button
                    background="#EC8845"
                    position="static"
                    onClick={() => {
                      if (TabsArray[activeTab] === "Deposit") {
                        stakeRock();
                      } else if (TabsArray[activeTab] === "Withdraw") {
                        withdrawRock();
                      } else if (TabsArray[activeTab] === "Claim Bitcoin") {
                        claimBitcoin();
                      } else if (TabsArray[activeTab] === "Claim Rock") {
                        claimRock();
                      } else if (TabsArray[activeTab] === "Rock Slide") {
                        rockSlide();
                      }
                    }}
                  >
                    {TabsArray[activeTab]}
                  </Button>
                  {!isClaim && (
                      <Button  width="80px" position="static" outline style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "15px",
                        padding: "20px"
                      }}
                      onClick={() => setMax()}
                      >
                        Max
                      </Button>
                  )}
                </div>
                <BalanceTextMobile>Balance: {userRockBalance.toFixed(0)} ROCK</BalanceTextMobile>
              </div>
            </Card>

          </NewTabsCardContainers>
        </NewTabsContainer>
      </NewTabsSection>

      <NewTabsSection>
        <NewTabsContainer>

          <NewTabsCardContainers>
            <Card height="140px">
            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    width="280px" background="#EC8845"
                   position="static" outline style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "40px",
                      padding: "30px"}}

                    onClick={() => {
                      distributeBTCB();
                    }}
                  >
                    Drip Bitcoin
                  </Button>
                </div>
            </Card>

          </NewTabsCardContainers>
        </NewTabsContainer>
      </NewTabsSection>
    </>
  );
}

export default Tabs;
