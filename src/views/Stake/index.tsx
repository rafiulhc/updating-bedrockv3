import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeroText from "../HomePage/Hero/HeroText";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import CharacterImage from "../HomePage/Hero/CharacterImage";
import Character from "../../assets/images/character.png";
import Image from "next/image";
import Button from "../../components/Button";
import StakeRow from "./StakeRow";
import StakeWrapper from "./StakeWrapper";
import StakeCard from "./StakeCard";
import StakeBalance from "./StakeBalance";
import Paragraph from "../../components/Paragraph";
import SectionHeading from "../../components/SectionHeading";
import StakeInput from "./StakeInput";
import StakeSelect from "./StakeSelect";
import StakeOption from "./StakeOption";
import StakeStats from "./StakeStats";
import StakeCommunity from "./StakeCommunity";
import people from "../../assets/images/community.png";
import coins from "../../assets/images/coins.png";
import tick from "../../assets/images/tick.png";
import CommunityImg from "./CommunityImg";
import Footer from "../../components/Footer";
import StakeWork from "./StakeWork";
import CommunityCard from "./CommunityCard";
import WorkRow from "./WorkRow";
import VideoContainer from "../HomePage/Earn/VideoContainer";
import Iframe from "../../components/Iframe";
import Select from "react-dropdown-select";
import SelectButton from "./SelectButton";
import SelectContent from "./SelectContent";
import Stakes from "./Stakes";
import useWindowSize from "../../hooks/useWindowSize";
import { useRouter } from "next/router";

import axios from "axios";
import StakeDescription from "./StakeDescription";
import WrapperLeft from "./WrapperLeft";
import WrapperRight from "./WrapperRight";
import HeroCharacter from "../../components/HeroCharacter";
import { Background, Card, InputField } from "../Swap/components/index";
import { Select as CSelect, Data } from "./Components/Select/Select";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useMetaMask from "../../hooks/useMetaMask";
import {
  useBedrockContract,
  useBedrockStakingContract,
} from "../../hooks/useContract";
import Staking from "../../../pages/staking";
import { StakesTable, TableData } from "./Components/StakesTable/StakesTable";
import { CommunitySection } from "./Components/CommunitySection/CommunitySection";
import { HowItWorks } from "./Components/HowItWorks/HowItWorks";
import { Hero } from "./Components/Hero/Hero";
import { useIsMobile } from "../../hooks/useIsMobile";

const BackgroundContainer = styled.div`
  z-index: 1;
  position: relative;
`

const NewCardsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const NewCardsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 770px) {
    padding: 0 3%;
  }
`;

const NewCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const BalanceCardContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  padding: 5%;
  color: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const BalanceCardContent = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const BalanceCardBuyMoreContainer = styled.div`
  flex: 1 1 60%;
  display: flex;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const BalanceValue = styled.h2`
  font-size: 50px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const StakingCardContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  color: #ffffff;
`;

const CardText = styled.p`
  opacity: 0.75;
  font-size: 18px;
`

function useQuery() {
  const { search } = useRouter() as any;
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Stake() {
  const inputRef = useRef(null);

  const SelectData: Data[] = [
    { text: "1%-30 days", value: "1" },
    { text: "1%-90 days", value: "3" },
    { text: "1%-180 days", value: "6" },
    { text: "1%-360 days", value: "12" },
  ];

  const [tableData, setTableData] = useState<TableData[] | null>([]);

  const [stakeAmount, setStakeAmount] = useState<BigNumber | null>(null);
  const [holders, setHolders] = useState(0);

  const [userMerchRequests, setUserMerchRequests] = useState([]);
  const [usdStaked, setUsdStaked] = useState(0);
  const [stakedAmountReward, setStakeAmountReward] = useState([]);
  const [stakePeriod, setStakePeriod] = useState(1);
  const [isOldStaker, setIsOldStaker] = useState(false);
  const [myStakes, setMyStakes] = useState([]);
  const [stakedPeriodAmount, setStakedPeriodAmount] = useState([]);
  const [myBalance, setMyBalance] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [claimFee, setClaimFee] = useState("0");
  const [rockPriceUsd, setRockPriceUsd] = useState(0);
  const [referralAddress, setReferralAddress] = useState("");
  const [referralsRewards, setReferralsRewards] = useState(null)

  const query = useQuery();

  const { connect, account, disconnect, isActive, shouldDisable } =
    useMetaMask();
  const { library } = useActiveWeb3React();
  const bedrock = useBedrockContract();
  const staker = useBedrockStakingContract();
  const { isMobile } = useIsMobile();


  useEffect(() => {
    async function getReferrels() {
      if (!account || account.length !== 42) {
        return
      }
      await axios
        .get(`/api/getLogReferrals/?referrer=${account}`)
        .then((res) => {
          let sum = new BigNumber(0)
          for (let i = 0; i < res.data.referrals.length; i++) {
            const referral = res.data.referrals[i]
            if (parseInt(referral.stakeTime) === 6 * 2592000) {
              sum = new BigNumber(sum).plus(new BigNumber(referral.amount).multipliedBy(0.02))
            } else if (parseInt(referral.stakeTime) === 12 * 2592000) {
              sum = new BigNumber(sum).plus(new BigNumber(referral.amount).multipliedBy(0.05))
            }
          }

          setReferralsRewards(sum)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getReferrels()
  }, [account])

  useEffect(() => {
    async function getMerch() {
      await axios
        .get(`/api/getUserMerchRequests/?acc=${account}`)
        .then((res) => {
          setUserMerchRequests(res.data.merchrequests);
        })
        .catch((err) => console.log(err));
    }
    getMerch();
  }, [account]);

  useEffect(() => {
    if (isOldStaker) {
      setReferralAddress("");
      return;
    }
    if (query.get("ref")?.length === 42 && query.get("ref") !== account) {
      localStorage.setItem("bedrock_referrer", query.get("ref"));
      setReferralAddress(query.get("ref"));
    } else if (localStorage.getItem("bedrock_referrer")) {
      setReferralAddress(localStorage.getItem("bedrock_referrer"));
    }
  }, [account, isOldStaker]);

  useEffect(() => {
    const asyncEffect = async () => {
      const debugging = null;
      if (account) {
        // eslint-disable-next-line
        const balance = await bedrock.functions.balanceOf(
          debugging ? debugging : account
        );
        setMyBalance(balance.toString() / 10 ** 18);
      }
    };
    asyncEffect();
  });

  useEffect(() => {
    const asyncEffect = async () => {
      await axios
        .get(
          "https://api.covalenthq.com/v1/56/tokens/0xc3387e4285e9f80a7cfdf02b4ac6cdf2476a528a/token_holders/?quote-currency=USD&format=JSON&page-size=1000&key=ckey_16d5709f6c0748cb9731c4a6544"
        )
        .then((res) => {
          setHolders(res.data.data.items?.length);
        })
        .catch((err) => console.log("err", err));

      await axios
        .get(`/api/getStakeEvents`)
        .then(async (res) => {
          console.log(res.data);
          const oneMonth = new BigNumber(
            res.data.stakes.value.oneMonth
          ).dividedBy(10 ** 18);

          const threeMonth = new BigNumber(
            res.data.stakes.value.threeMonths
          ).dividedBy(10 ** 18);

          const sixMonth = new BigNumber(
            res.data.stakes.value.sixMonths
          ).dividedBy(10 ** 18);

          const twelveMonth = new BigNumber(
            res.data.stakes.value.twelveMonths
          ).dividedBy(10 ** 18);

          const total = oneMonth
            .plus(threeMonth)
            .plus(sixMonth)
            .plus(twelveMonth);
          setStakeAmount(total);
          console.log("stakeAmount", stakeAmount)
        })
        .catch((err) => console.log(err));
    };
    asyncEffect();
  });

  useEffect(() => {
    const asyncEffect = async () => {
      if (account) {
        var totalStakes = await staker.functions.totalUserStakes(account);
        totalStakes = parseInt(totalStakes);

        const res = await axios.get(
          `https://api.pancakeswap.info/api/v2/tokens/0xC3387E4285e9F80A7cFDf02B4ac6cdF2476A528A`
        );
        setRockPriceUsd(parseInt(res.data.data.price))

        const stakePeriodAmoutInfo = [];
        let validStake = null;
        let firstStake = null;

        const tempTableData: TableData[] = [];

        for (let i = 0; i < totalStakes; i++) {
          // eslint-disable-next-line
          const stakeId = await staker.functions.userStakes(account, i);
          // eslint-disable-next-line no-await-in-loop
          const info = await staker.functions.getStakeInformation(stakeId[0]);
          firstStake = i === 0 ? info : firstStake;
          if (parseInt(info.endsAt) > 0) {
            validStake = stakeId;
            let daysUnclaimed = Math.floor(
              (Date.now() / 1000 - info.lastRewardClaimTime) / (2592000 / 30)
            );
            daysUnclaimed =
              daysUnclaimed <= info.remainingDailyRewards
                ? parseInt(daysUnclaimed.toFixed())
                : parseInt(info.remainingDailyRewards);
            const dailyReward = parseFloat(
              parseFloat((info.dailyReward / 10 ** 18).toString()).toFixed(2)
            );
            const usdUnclaimed =
              dailyReward *
              daysUnclaimed *
              (rockPriceUsd ? parseFloat(rockPriceUsd?.toFixed(2)) : 1);

            tempTableData.push({
              stakeId: stakeId,
              dailyReward: dailyReward,
              endDate: parseInt(info.endsAt),
              staked: {
                value: Math.ceil(info.amount / 10 ** 18),
                coin: "ROCK",
              },
              daysUnclaimed: daysUnclaimed,
              usdUnclaimed: usdUnclaimed.toFixed(2),
              rockUnclaimed: (daysUnclaimed * dailyReward).toFixed(2),
              start:
                parseInt(info.endsAt) -
                (parseInt(info.stakingPeriod) / 2592000) * 30,
            });

            stakePeriodAmoutInfo.push({
              stakeId,
              staked: Math.ceil(info.amount / 10 ** 18),
              stakedPeriod: parseInt(info.stakingPeriod),
            });
          } else {
            totalStakes++;
          }

          setIsOldStaker(
            firstStake &&
            firstStake.dailyReward > 0 &&
            (firstStake.endsAt === 0 ||
              firstStake.endsAt <= Date.now() / 1000)
          );
          setMyStakes(tableData);
          setStakedPeriodAmount(stakePeriodAmoutInfo);
          const claimGas = await staker.estimateGas.claimRewards(validStake[0]);
          const gasPrice = await library.getGasPrice();
          const gasPrice2 = new BigNumber(gasPrice?.mul(claimGas).toNumber())
            .div(10 ** 18)
            .toString();
          setClaimFee(gasPrice2);
        }
        setTableData([...tempTableData]);
      }
    };
    asyncEffect();
  }, [account]);

  const initiateStake = async () => {
    if (!stakeAmount || stakeAmount.lte(0)) {
      alert("Please enter a valid stake amount");
      return;
    }
    if (!stakePeriod || stakePeriod < 1 || stakePeriod > 12) {
      alert("Please select a valid staking period");
      return;
    }
    if (stakeAmount.gt(myBalance)) {
      alert("You do not have sufficient balance to stake");
      return;
    }

    const init = await staker.functions.initialized();

    if (!init) {
      alert("The staking has not yet been initialized, please wait...");
      return;
    }

    const minStake = await staker.functions.minimumStakingAmount();
    if (stakeAmount.lt(minStake / 10 ** 18)) {
      alert(`The minimum staking amount is ${minStake / 10 ** 18}`);
      return;
    }

    const amount = new BigNumber(stakeAmount.multipliedBy(10).multipliedBy(18)).toFixed();

    try {
      await bedrock.functions
        .approve(staker.address, amount)
        .then(async (data) => {
          await data.wait();
          await staker.functions
            .stake(amount, stakePeriod * 2592000)
            .then(async (data2) => {
              await data2.wait();
              const referralData = {
                referrer: referralAddress,
                transaction: data2.hash,
              }

              const staked = Number(stakeAmount.multipliedBy(rockPriceUsd))
              const hasClaimedShirt = userMerchRequests.filter((item) => item.rewardType.includes('shirt'))
              const hasClaimedHoodie = userMerchRequests.filter((item) => item.rewardType.includes('hoodie'))
              const hasClaimedJacket = userMerchRequests.filter((item) => item.rewardType.includes('jacket'))

              if (staked >= 1000 && staked < 5000 && hasClaimedShirt.length === 0) {
                const myReward = {
                  address: account,
                  txHash: data2.hash,
                  mailed: false,
                  mailingaddress: null,
                  rewardType: 'T-shirt',
                }
                await axios
                  .post(`/api/postMerchRequests`, myReward)
                  .then((res) => {
                    console.log(res.data)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              } else if (staked >= 5000 && staked < 10000 && hasClaimedHoodie.length === 0) {
                const myReward2 = {
                  address: account,
                  txHash: data2.hash,
                  mailed: false,
                  mailingaddress: null,
                  rewardType: 'Hoodie',
                }
                await axios
                  .post(`/api/postMerchRequests`, myReward2)
                  .then((res) => {
                    console.log(res.data)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              } else if (staked >= 10000 && hasClaimedJacket.length === 0) {
                const myReward3 = {
                  address: account,
                  txHash: data2.hash,
                  mailed: false,
                  mailingaddress: null,
                  rewardType: 'Jacket',
                }
                await axios
                  .post(`/api/postMerchRequests`, myReward3)
                  .then((res) => {
                    console.log(res.data)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }

              await axios
              .post(`/api/postLogReferral`, { ...referralData })
              .then((res) => {
                console.log(res.data)
              })
              .catch((err) => {
                console.log(err)
              })


            });
        });


    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }


  };

  const claimRewards = async (stakeId: string) => {
    try {
      await staker.functions.claimRewards(stakeId).then(async (data) => {
        await data.wait();
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const unstake = async (stakeId: string) => {
    try {
      await staker.functions.unstake(stakeId).then(async (data) => {
        await data.wait();
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const redeemReferralReward = async () => {
    const rewardReferral = {
      referrer: account,
    };
    await axios
      .post(`/api/postRedeemReferrals`, { ...rewardReferral })
      .then((res) => {
        console.log((res as any).message);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div  style={{overflow: 'hidden'}}>
      <Navbar />
      <BackgroundContainer>
        <Background zIndex="-1" isMobile={isMobile} />
          <Hero onClickReferalLink={() => { navigator.clipboard.writeText(`${window.location.host}/staking?ref=${account}`)}} />
          <NewCardsSection>
            <NewCardsRow>
              <NewCardsContainer>
                <Card border="1px" height="200px" width="445px">
                  <BalanceCardContentContainer>
                    <BalanceCardContent>
                      <CardText>Your bedrock balance</CardText>
                      <BalanceValue>{myBalance}</BalanceValue>
                      <CardText style={{ fontSize: "14px" }}>updated 4 days ago</CardText>
                    </BalanceCardContent>
                    <BalanceCardBuyMoreContainer>
                      <Button background="#EC8845">Buy More</Button>
                    </BalanceCardBuyMoreContainer>
                  </BalanceCardContentContainer>
                </Card>
                <Card border="1px" height="200px" width="445px">
                  <StakingCardContentContainer>
                    <CardText>Enter Amount to Stake</CardText>
                    <InputField
                      readonly={false}
                      type={"number"}
                      onChange={(val) => setStakeAmount(new BigNumber(parseInt(val)))}
                    />
                  </StakingCardContentContainer>
                </Card>
                <Card border="1px" height="200px" width="445px">
                  <StakingCardContentContainer>
                    <CardText>Select staking period</CardText>
                    <CSelect
                      data={SelectData}
                      onSelection={(val) => {
                        setStakePeriod(parseInt(val.value));
                      }}
                    />
                  </StakingCardContentContainer>
                </Card>
              </NewCardsContainer>
            </NewCardsRow>
            <div style={{ display: "grid", placeItems: "center" }}>
              {account ? (
                <Button outline onClick={initiateStake}>
                  Stake now
                </Button>
              ) : (
                <Button background="#EC8845" onClick={connect}>
                  Connect
                </Button>
              )}
               {referralsRewards && referralsRewards > 0 && (
                <Button onClick={() => redeemReferralReward()}>
                  Claim {referralsRewards / 10 ** 18} ROCK referral rewards
                </Button>
              )}
            </div>
          </NewCardsSection>
      </BackgroundContainer>
      <StakesTable
        data={tableData}
        onClaim={(val) => {
          // val is the index of the claim button tableData
          claimRewards(tableData[val].stakeId);
        }}
        onDelete={(val) => {
          // val is the index of the bin button tableData
          unstake(tableData[val].stakeId);
        }}
      />

      <CommunitySection
        card1={{ title: "Total Users", value: `${holders}`, img: people }}
        card2={{ title: "Staked Tokens", value: `${stakeAmount}`, img: coins }}
      />

      <HowItWorks
        title="How It Works"
        paragraphs={[
          "Stake Rock to earn additional Rock.",
          "Rock rewards are limited since the supply of the token is fixed.",
          "Staking rewards are on a first come first serve basis and will be open to the public untli the wallet has been depleted.",
        ]}
      />
      <Footer />
    </div>
  );
}

export default Stake;
