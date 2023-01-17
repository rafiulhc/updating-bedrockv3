import React, { useEffect, useState } from 'react'
import TextArea from '../TextArea'
import Paragraph from '../../../../../components/Paragraph'
import SectionHeading from '../../../../../components/SectionHeading'
import TokenSupply from './TokenSupply'
import Balance from './Balance'
import BottomCardContainer from './BottomCardContainer'
import bedrock from '../../../../../assets/images/bedrock.svg'
import ImageWrapper from './ImageWrapper'
import Image from 'next/image'
import BigNumber from "bignumber.js";
import { useBedrockContract } from '../../../../../hooks/useContract'
import styled from "styled-components";
import { Card } from '../../../../Swap/components'
import useMetaMask from '../../../../../hooks/useMetaMask'



const NewCardContent = styled.div`
  display: flex;
  gap: 16px;
  height: 100%;
  width: 100%;
  padding: 10%;

`
const NewCardInformation = styled.div`
  color: #ffffff;
  flex: 1 1 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const NewCardTitle = styled.h1`
  font-size: 18px;
  opacity: 0.75;
`




export interface InfoCardsData {
    myInvestments: string;
    poolShare: number;
    poolBalance: string;
}
interface InformationCardsProps {
    data: InfoCardsData;
}

function CardBottom() {

  const { account } = useMetaMask();
  const rockContract = useBedrockContract();
  const [burnAmount, setBurnAmount] = useState(192173);
  const [stakeAmount, setStakeAmount] = useState(31772772);
  const [pancakeswapAmount, setPancakeswapAmount] = useState(35172703);
  const [bitmartAmount, setBitmartAmount] = useState(0);
  const [babydogeAmount, setBabydogeAmount] = useState(0);
  const [pancakeBNBAmount, setPancakeBNBAmount] = useState(0);

  useEffect(() => {
    const fetchStakeData = async () => {
      await rockContract.functions.balanceOf("0x000000000000000000000000000000000000dead").then((res) => {
        setBurnAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
      await rockContract.functions.balanceOf("0xbf6561d490291edfa104377382c52f53783ccad1").then((res) => {
        setStakeAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
      await rockContract.functions.balanceOf("0xc5e078ef4cc25d92b410ceeae7051aebca5c81c0").then((res) => {
        setPancakeswapAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
      await rockContract.functions.balanceOf("0x328130164d0f2b9d7a52edc73b3632e713ff0ec6").then((res) => {
        setBitmartAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
      await rockContract.functions.balanceOf("0x399c5DCA34b8B6d452be837F40DA8958864Af1AC").then((res) => {
        setBabydogeAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
      await rockContract.functions.balanceOf("0xc2Cf6e433Bd3c0Bbf1A006c0b00b4a83301a827E").then((res) => {
        setPancakeBNBAmount(new BigNumber(res).dividedBy(10 ** 18).toNumber());
      });
  }
    fetchStakeData();
  }, [burnAmount, stakeAmount, pancakeswapAmount, bitmartAmount, rockContract, rockContract.functions.balanceOf]);


  return (
      <>
    <div style={{display:"grid"}}>
    <div>
    <div style={{display:"flex", justifyContent:"space-evenly", height:"300px"}}>
            <BottomCardContainer  style={{margin:"5px", textAlign:"center"}}>
                  <NewCardContent>
                <NewCardInformation>
                <h5>Total Token Supply</h5><br />
                  <h5>500,000,000
                  </h5>
                </NewCardInformation>
              </NewCardContent>
            </BottomCardContainer>
            <BottomCardContainer style={{margin:"5px", textAlign:"center"}}>
                  <NewCardContent>
                <NewCardInformation>
                <h5>ROCK Staked</h5>
                  <h5>
                  <br/>{stakeAmount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                </NewCardInformation>
              </NewCardContent>
            </BottomCardContainer>
            </div>
            <div style={{display:"flex", justifyContent:"space-evenly", height:"300px"}}>
            <BottomCardContainer style={{margin:"5px", textAlign:"center"}}>
                  <NewCardContent>
                <NewCardInformation>
                <h5>Burn Amount</h5>
                  <h5>
                  <br/>{burnAmount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                </NewCardInformation>
              </NewCardContent>
            </BottomCardContainer>
            <BottomCardContainer style={{margin:"5px", textAlign:"center"}}>
                  <NewCardContent>
                <NewCardInformation>
                <h5>Current Tokens Available</h5>
                  <h5>
                  <br/>{(pancakeswapAmount + bitmartAmount + babydogeAmount + pancakeBNBAmount).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>

                </NewCardInformation>
              </NewCardContent>
            </BottomCardContainer>
            </div>
    </div>
    </div>
    </>
  )
}

export default CardBottom