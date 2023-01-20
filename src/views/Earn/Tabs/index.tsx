import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import useWindowSize from "../../../hooks/useWindowSize";
import styled from "styled-components";
import { Card, InputField } from "../../Swap/components/index";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import useMetamask from "../../../hooks/useMetaMask";
import useTimer from "../../../hooks/useTimer";
import useFetchdata from "../../../hooks/useFetchdata";
import { EvmChain } from '@moralisweb3/evm-utils';
import { ethers } from "ethers";
import {
  useBitcoinStakingContract,
  useBtcbContract,
  useBedrockContract,
  useBtcbDripContract
} from "../../../hooks/useContract";
import { usePopper } from 'react-popper';
import Moralis from "moralis";


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
  const [dripTime, setDripTime]  = useTimer();
  const { library } = useMetamask();
  const [
    unclaimedBTCAmount, setUnclaimedBTCAmount, claimableRock, setClaimableRock, nextDripTime, setNextDripTime, claimableBitcoin,
    setClaimableBitcoin, investedRock, setInvestedRock, poolBitcoin, setPoolBitcoin, poolRock, setPoolRock, userRockBalance,
    setUserRockBalance, depositAmount, setDepositAmount, withdrawalAmount, setWithdrawalAmount, nextDripValue, setNextDripValue,
     myPoolShare, setMyPoolShare, unclaimRockAmount, setUnclaimRockAmount, rockSlideCount, setRockSlideCount,
    userShare, setUserShare, bitcoinInterval, setBitcoinInterval, totalPoolRock, setTotalPoolRock, bitcoinDripNextRelease,
    setBitcoinDripNextRelease, fetchStakeData
] = useFetchdata();
  const [ currentTime, setCurrentTime ] = useState(Math.floor(new Date().getTime() / 1000));
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const TabsArray = ["Deposit", "Withdraw", "Claim Bitcoin", "Claim Rock", "Rock Slide"];
  const [activeTab, setActiveTab] = useState(0);
  const [claimState, setClaimState] = useState("");

  const [transactionState, setTransactionState] = useState("");
  const [isBTCBDistributable, setIsBTCBDistributable] = useState(true);

  const [withdrawalState, setWithdrawalState] = useState("");
  const [distributeState, setDistributeState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBTCBModalOpen, setIsBTCBModalOpen] = useState(false);
  const [ isMax, setIsMax ] = useState(false);
  const [platformFee, setPlatformFee] = useState<any>(0)
  const { account } = useMetamask();

  const btcContract = useBtcbContract();
  const rockContract = useBedrockContract();
  const btcbDripContract = useBtcbDripContract();
  const router = useRouter();

  useEffect(() => {
    const getBNBValueOneUSD = async () => {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        // ...and any other configuration
    });
      let price = await Moralis.EvmApi.token.getTokenPrice({address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", chain: EvmChain.BSC})
      const bnbPriceUsd = parseInt(price.result.usdPrice.toString());
      const dollarBnb = 2.5/bnbPriceUsd
      setPlatformFee(dollarBnb.toFixed(6))
    }

    getBNBValueOneUSD();

  }, []);

  const setBTCBdistributable = async () => {

    setTimeout(() => {
      setIsBTCBDistributable(true)
      window.location.href = "/earnbitcoin"
    }, 86410000 );
  }



  const stakeRock = async () => {

    // alert("step 1 of 2")
    if (!depositAmount || depositAmount <= 0) {
      return;
    }
    setIsModalOpen(true);
    setTransactionState(`Staking ${depositAmount} ROCK`);

    try {
      setTransactionState(`Step 1 of 2: Approving ROCK spend...`);

      await rockContract.functions
        .approve(
          btcbDripContract.address,
          new BigNumber(depositAmount).multipliedBy(10 ** 18).toFixed()
        )
        .then(async (data) => {

          await data.wait();
          setTransactionState(`Step 2 of 2: Staking ROCK... please confirm the transaction`);

          await btcbDripContract.functions
            .stakeRock(
              new BigNumber(depositAmount).multipliedBy(10 ** 18).toFixed()
            )
            .then(async (data2) => {
              setTransactionState(`Please wait for the transaction confirmation`);
              await data2.wait();
              setTransactionState(`Staking ROCK successful!`);
              fetchStakeData();
              setTimeout(() => {
                setIsModalOpen(false);
              }, 2000);
              setDepositAmount(0);
            // window.location.href = "/earnbitcoin";

            });
        });
    } catch (error) {
      setTransactionState(`Errored!`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
  };


  const withdrawRock = async () => {
    setIsModalOpen(true);
    setTransactionState(`ROCK withdrawal in progress...`);
    if (!withdrawalAmount || withdrawalAmount <= 0) {
      alert("Please input correct amount to withdraw")
      return;
    }
    try {
      await btcbDripContract.functions
        .withdrawRock(
          new BigNumber(withdrawalAmount).multipliedBy(10 ** 18).toFixed()
        )
        .then(async (data) => {
          await data.wait();
          setTransactionState(`ROCK withdrawal successful!`);
          fetchStakeData();
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
          // setWithdrawalAmount(0);
        });
    } catch (error) {
      setTransactionState(`Errored!`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
  };


  const claimBitcoin = async () => {
    setIsModalOpen(true);
    setTransactionState(`BTCB rewards withdrawal in progress...`);

    if (!claimableBitcoin || claimableBitcoin <= 0) {
      return;
    }

    setClaimState(`Step: Claiming Rock...`);

    try {
          await btcbDripContract.functions.claimBTCDrip().then(async (data2) => {
            await data2.wait();
            setTransactionState(`BTCB rewards withdrawal successful!`);
          fetchStakeData();
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
            fetchStakeData();
          });
    } catch (error) {
      setTransactionState(`Errored! Please try again`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
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
    setIsModalOpen(true);
    setTransactionState(`ROCK rewards withdrawal in progress...`);
    if (claimableRock <= 0) {
      return;
    }

    try {
          await btcbDripContract.functions.claimRock().then(async (data2) => {
            await data2.wait();
            setTransactionState(`ROCK rewards withdrawal successful`);
            setTimeout(() => {
              setIsModalOpen(false);
            }, 3000);
            fetchStakeData();
          });
    } catch (error) {
          setWithdrawalState("Errored!");
          setTimeout(() => {
            setIsModalOpen(false);
          }, 3000);
    }

  };

  const rockSlide = async () => {
    setIsModalOpen(true);
    setTransactionState(`ROCK Slide in progress...`);
    if (claimableRock <= 0) {
      return;
    }

    try {
          await btcbDripContract.functions.reInvestRock().then(async (data2) => {
            await data2.wait();
            setTransactionState(`ROCK Slide successful!`);
            setTimeout(() => {
              setIsModalOpen(false);
            }, 2000);
           fetchStakeData();
          });
    } catch (error) {
      setTransactionState(`Errored!`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
  };

  const setMax  = async () => {
    setDepositAmount(parseInt(userRockBalance.toFixed(2)));
    setWithdrawalAmount(parseInt(investedRock.toFixed(2)));
    setIsMax(true);
  };

  // distributeBTCB among holders. Can be called by anyone
  const distributeBTCB = async () => {
    setIsBTCBModalOpen(true);
    setTransactionState(`Please wait for the response from blockchain...`);
    try {
      let signer = library.getSigner();
      /*let tx = await signer.sendTransaction({
        to: "0x3dEaB2F412FF828fA849ECe784789cDf862328d7",
        value: ethers.utils.parseEther(platformFee) // 0.0001 ether/bnb
      })*/
          await btcbDripContract.functions.distributeBitcoin({
            gasLimit: 1000000
          }).then(async (data) => {
            await data.wait();

            setTransactionState(`Successfully distributed BTCB`);
            setIsBTCBDistributable(false)
            fetchStakeData();
            setBTCBdistributable()
            if(bitcoinDripNextRelease - currentTime <= 0){
              setDripTime(0);
            } else {
              setDripTime(bitcoinDripNextRelease - currentTime)
            }
            setTimeout(() => {
              setIsBTCBModalOpen(false);
            }, 3000);



          });
    } catch (error) {
      fetchStakeData();
      setTransactionState(`Already distributed or not enough time passed`);
      setTimeout(() => {
        setIsBTCBModalOpen(false);
      }, 4000);

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
          {(isModalOpen && (TabsArray[activeTab] == "Deposit" || TabsArray[activeTab] == "Withdraw" || TabsArray[activeTab] == "Claim Bitcoin" || TabsArray[activeTab] == "Claim Rock")) && (
            <Card height="120px">
            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{color:"white", margin:"15px"}}>{transactionState}</h3>
                </div>
            </Card>
          )}
        </NewTabsCardContainers>
      </NewTabsContainer>
    </NewTabsSection>

      <NewTabsSection >
        <NewTabsContainer >
          <NewTabsHeaderScrollContainer ref={setReferenceElement}>
            <NewTabsHeader >
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
          <div  >
        {TabsArray[activeTab] == "Rock Slide" && <h5 style={{color:"#E98331", textAlign:"center", justifyContent:"center"}}>Compound (Rock Slide) unclaimed Rock to earn more BTCB & Rock</h5>}
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
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
                    <h1 style={{ color: 'white' }}>{claimableBitcoin.toFixed(9)}</h1>
                  </div>
                )}
                {(isClaim && TabsArray[activeTab] === "Claim Rock") && (
                  <div>
                    <h1 style={{ color: 'white' }}>{claimableRock.toFixed(2)}</h1>
                  </div>
                )}
                {(isClaim && TabsArray[activeTab] === "Rock Slide") && (
                  <div >
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
                      {(TabsArray[activeTab] === "Withdraw") ? <BalanceText>Stakes: {investedRock.toFixed(2)} ROCK</BalanceText> :
                       <BalanceText>Balance: {userRockBalance.toFixed(2)} ROCK</BalanceText>}
                    </div>
                    <div>
                    {(!isMax && TabsArray[activeTab] === "Deposit") && (
                        <InputField
                        readonly={false}
                        type={"number"}
                        onChange={(ev) => setDepositAmount(parseInt(ev))}
                      />
                    )}
                    {(!isMax && TabsArray[activeTab] === "Withdraw") && (
                        <InputField
                        readonly={false}
                        type={"number"}
                        onChange={(ev) => setWithdrawalAmount(parseInt(ev))}
                      />
                    )}
                    {(isMax && TabsArray[activeTab] === "Deposit") && (
                       <div onChange={()=> setIsMax(false)}>
                        <InputField  value ={String(userRockBalance.toFixed(2))} />
                        </div>
                    )}
                    {(isMax && TabsArray[activeTab] === "Withdraw") && (
                        <div onChange={()=> setIsMax(false)}>
                        <InputField value ={String(investedRock.toFixed(2))} />
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

                      <Button width="80px" position="static" outline style={{
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
                <BalanceTextMobile>Balance: {userRockBalance.toFixed(2)} ROCK</BalanceTextMobile>
              </div>
            </Card>

          </NewTabsCardContainers>
        </NewTabsContainer>
      </NewTabsSection>

      <NewTabsSection>
        <NewTabsContainer>
        {isBTCBModalOpen && (
            <Card height="120px">
            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{color:"white", margin:"15px"}}>{transactionState}</h3>
                </div>
            </Card>
          )}
          <NewTabsCardContainers>
            <Card height="140px">
            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {
                     isBTCBDistributable ? <Button
                    width="280px" background={ bitcoinDripNextRelease - currentTime <= 0 ? "#391628" : "#EC8845"}

                   position="static" outline style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "40px",
                      padding: "30px"}}

                      onClick={() => {
                        if (bitcoinDripNextRelease - currentTime <= 0){
                          distributeBTCB();
                        }else {
                          return
                        }
                      }}
                  >
                    Send out the BTCB!
                  </Button> : <Button
                    width="280px" background="#EC8845"
                   position="static" outline style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "40px",
                      padding: "30px"}}

                  >
                    Send out the BTCB!
                  </Button>
                  }
                </div>
            </Card>

          </NewTabsCardContainers>
        </NewTabsContainer>
      </NewTabsSection>
    </>
  );
}

export default Tabs;
