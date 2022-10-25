import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";
import EarnTimer from "./EarnTimer";
import EarnWork from "./EarnWork";
import EarnWrapper from "./EarnWrapper";
import { InformationCards } from "./InformationCards/InfromationCards";
import Tabs from "./Tabs";
import { useRouter } from "next/router";

import axios from "axios";
import BigNumber from "bignumber.js";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useMetamask from "../../hooks/useMetaMask";
import {
  useBitcoinStakingContract,
  useBtcbContract,
  useBedrockContract,
} from "../../hooks/useContract";
import { useIsMobile } from "../../hooks/useIsMobile";
import styled from "styled-components";
import { Background } from "../Swap/components";

function Earn() {
  const { library } = useActiveWeb3React();
  const { account } = useMetamask();
  const btcStaking = useBitcoinStakingContract();
  const btcContract = useBtcbContract();
  const rockContract = useBedrockContract();
  const router = useRouter();

  const [investedRock, setInvestedRock] = useState(0);
  const [claimableRock, setClaimableRock] = useState(0);
  const [myPoolShare, setMyPoolShare] = useState(0);
  const [userRockBalance, setUserRockBalance] = useState(0);
  const [poolRock, setPoolRock] = useState(0);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    (async () => {
      if (account) {
        await btcStaking.functions.rockStakes(account).then((res) => {
          setInvestedRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
        });
        await rockContract.functions
          .balanceOf(btcStaking.address)
          .then((res) => {
            setPoolRock(new BigNumber(res).dividedBy(10 ** 18).toNumber());
          });
      }
    })().then(() => { });
  }, [account]);

  return (
    <div style={{overflow: 'hidden'}}>
      <Navbar />
      <EarnWrapper>
        <Background isMobile={isMobile} />
        <Title
          textAlign="center"
        >
          Earn Bitcoin By <br />
          Staking ROCK
        </Title>
        <Tabs />
      </EarnWrapper>
      <EarnTimer />
{/* <DripinTimer/> */}
      <InformationCards
        data={{
          myInvestments: `${investedRock}`,
          poolBalance: `${(poolRock / 1000).toFixed(2)}`,
          poolShare: (investedRock / poolRock) * 100,
        }}
      />
      <EarnWork />

      <Footer />
    </div>
  );
}

export default Earn;
