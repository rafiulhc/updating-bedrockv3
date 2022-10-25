import React, { useState, useEffect } from "react";
import Paragraph from "../../../components/Paragraph";
import EarnAction from "./EarnActions";
import EarnInput from "./EarnInput";
import StakeAmount from "./StakeAmout";
import { ethers } from "ethers";
import TabCard from "./TabCard";
import TabContainer from "./TabContainer";
import TabItem from "./TabItem";
import TabRow from "./TabRow";
import Button from "../../../components/Button";
import useWindowSize from "../../../hooks/useWindowSize";
import styled from "styled-components";
import { Card, InputField } from "../../Swap/components/index";
import BigNumber from "bignumber.js";
import axios from "axios";
import { useRouter } from "next/router";

import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import useMetamask from "../../../hooks/useMetaMask";
import {
  useBitcoinStakingContract,
  useBtcbContract,
  useBedrockContract,
} from "../../../hooks/useContract";

const NewTabsSection = styled.div`
  display: grid;
  place-items: center;
  margin: 0 3%;
`;

const NewTabsContainer = styled.div`
  width: 100%;
  max-width: 763px;
  overflow: hidden;
`;

const NewTabsHeaderScrollContainer = styled.div`
  width: 100%;
  max-width: 763px;
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
  const TabsArray = ["Deposit", "Withdraw", "Claim Bitcoin", "Claim Rock", "Roll Rock"];
  const { width } = useWindowSize();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabContent, setActiveTabContent] = useState(TabsArray[0]);

  const [claimState, setClaimState] = useState("");
  const [modWallet, setModWallet] = useState("");
  const [claimableRock, setClaimableRock] = useState(0);
  const [nextDripTime, setNextDripTime] = useState(0);
  const [claimableBitcoin, setClaimableBitcoin] = useState(0);
  const [investedRock, setInvestedRock] = useState(0);
  const [poolBitcoin, setPoolBitcoin] = useState(0);
  const [poolRock, setPoolRock] = useState(0);
  const [userRockBalance, setUserRockBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositState, setDepositState] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalState, setWithdrawalState] = useState("");
  const [nextDripValue, setNextDripValue] = useState(0);
  const [myPoolShare, setMyPoolShare] = useState(0);

  const { library } = useActiveWeb3React();
  const { account } = useMetamask();
  const btcStaking = useBitcoinStakingContract();
  const btcContract = useBtcbContract();
  const rockContract = useBedrockContract();
  const router = useRouter();

  const api =
    (router as any).hostname === "localhost"
      ? "http://localhost:8080"
      : "https://bedrock-backend.vercel.app";

  // next btc drip value
  useEffect(() => {
    let btcbPrice = 0;
    const asyncEffect = async () => {
      const res = await axios.get(
        `https://api.pancakeswap.info/api/v2/tokens/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c`
      );
      btcbPrice = parseInt(res.data.data.price);
      setNextDripValue(poolBitcoin * 0.01 * parseInt(btcbPrice?.toFixed(0)));
      setMyPoolShare(new BigNumber((investedRock / poolRock) * 100).toNumber());
    };
    asyncEffect();
  }, [poolBitcoin, investedRock, poolRock]);

  useEffect(() => {
    const fetchStakeData = async () => {
      if (account) {
        await btcStaking.functions.unclaimedRock(account).then((res) => {
          setClaimableRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await btcStaking.functions.rockStakes(account).then((res) => {
          setInvestedRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await rockContract.functions.balanceOf(account).then((res) => {
          setUserRockBalance(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
      }
      await axios
        .get(`/api/getBitcoinRewards/?wallet=${account}`)
        .then((res) => {
          if (!res || res.status !== 200) {
            return;
          }
          if (res.data.nextRelease) {
            setNextDripTime(
              Math.ceil((res.data.nextRelease - Date.now()) / 1000)
            );
          }
          setModWallet(res.data.moderatorWallet || "");
          if (res.data.staked.length === 0) {
            return;
          }
          setClaimableBitcoin(
            new BigNumber(res.data.staked[0].amount)
              .dividedBy(10 ** 18)
              .toNumber()
          );
        })
        .catch((err) => {
          console.log(err);
        });
      await btcContract.functions.balanceOf(btcStaking.address).then((res) => {
        setPoolBitcoin(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
      await rockContract.functions.balanceOf(btcStaking.address).then((res) => {
        setPoolRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
    };

    fetchStakeData();
  }, [
    account,
    api,
    btcStaking.functions,
    btcContract.functions,
    rockContract.functions,
    btcStaking.address,
  ]);

  const stakeRock = async () => {
    setDepositState(`Staking ${depositAmount} ROCK`);
    if (!depositAmount || depositAmount <= 0) {
      return;
    }

    try {
      setDepositState(`Step 1 of 2: Approve ROCK spend`);
      await rockContract.functions
        .approve(
          btcStaking.address,
          new BigNumber(depositAmount).multipliedBy(10 ** 18).toFixed()
        )
        .then(async (data) => {
          await data.wait();
          setDepositState(`Step 2 of 2: Staking ROCK`);
          await btcStaking.functions
            .stakeRock(
              new BigNumber(depositAmount).multipliedBy(10 ** 18).toFixed()
            )
            .then(async (data2) => {
              await data2.wait();
              window.location.href = "/earnbitcoin";
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
      await btcStaking.functions
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
    const res = await axios.get(
      `https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
    );
    const bnbPriceUsd = parseInt(res.data.data.price);

    if (!claimableBitcoin || claimableBitcoin <= 0) {
      return;
    }
    setClaimState(`Step 1 of 2: Sending gas fee...`);

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
        setClaimState(`Step 2 of 2: Sending claim request...`);

        await axios
          .post(`/api/postClaimBitcoin/`, {
            wallet: account,
            proof: data.hash,
            value: oneDollarBnb,
          })
          .then((res) => {
            if (!res || res.status !== 200) {
              setClaimState(`Error: ${(res as any).message}`);
              console.log(res);
              return;
            }
          })
          .catch((err) => {
            setClaimState("An error occured while contacting server");
            console.log(err);
          });
      });
  };


  const claimRock = async () => {
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
          await btcStaking.functions.claimRock().then(async (data2) => {
            await data2.wait();
          });
        } catch (error) {
          setWithdrawalState("Errored!");
          console.log(error);
        }
      });
  };

  const rollRock = async () => {
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
          await btcStaking.functions.claimRock().then(async (data2) => {
            await data2.wait();
          });
        } catch (error) {
          setWithdrawalState("Errored!");
          console.log(error);
        }
      });
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
          <NewTabsHeaderScrollContainer>
            <NewTabsHeader>
              {TabsArray.map((val, index) => (
                <NewTabsLink
                  selected={TabsArray[activeTab] === val}
                  key={val}
                  onClick={() => {
                    if (index === 2 || index === 3) {
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
                {(isClaim) && (
                  <div>
                    <h1 style={{ color: 'white' }}>0</h1>
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
                      <BalanceText>Balance: 4.75 ROCK</BalanceText>
                    </div>
                    <div>
                      <InputField
                        readonly={false}
                        type={"number"}
                        onChange={(ev) => setDepositAmount(parseInt(ev))}
                      />
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
                      } else if (TabsArray[activeTab] === "Roll Rock") {
                        rollRock();
                      }
                    }}
                  >
                    {TabsArray[activeTab]}
                  </Button>
                  {(!isClaim) && (
                    <Button width="80px" position="static" outline>
                      Max
                    </Button>
                  )}
                </div>
                <BalanceTextMobile>Balance: 4.75 ROCK</BalanceTextMobile>
              </div>
            </Card>
          </NewTabsCardContainers>
        </NewTabsContainer>
      </NewTabsSection>
    </>
  );
}

export default Tabs;
