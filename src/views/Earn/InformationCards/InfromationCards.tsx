import React from 'react';
import styled from "styled-components";
import { Card } from "../../Swap/components/index";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import rock from "../../../assets/images/smallrock.png";
import Image from "next/image";

const NewCardsSection = styled.div`
  padding: 0 3%;
`

const NewCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;

  &>div {
    height: 180px
  }
`
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
interface NewCardValueProps {
  type: '1' | '2';
}
const NewCardValue = styled.div<NewCardValueProps>`
  display: flex;
  align-items: ${({type}) => type === '1' ? 'flex-end' : 'flex-start'};
  &>h2 {
    font-size: 50px;
  }
  &>span {
    font-size: 18px;
  }
`
const NewCardImage = styled.div`
  flex: 1 0 102px;
`
const NewCardProgress = styled.div`
  flex: 1 1 118px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const NewCard3Content = styled.div`
  color: #ffffff;
  height: 100%;
  width: 100%;

  padding: 10%;
  display: flex;
  flex-direction: column;
  position: relative;
`
const NewCard3BTCValue = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    top: 30px;
    right: 30px;
  }
`
export interface InfoCardsData {
    myInvestments: string;
    poolShare: number;
    poolBalance: string;
}
interface InformationCardsProps {
    data: InfoCardsData;
}
export const InformationCards: React.FC<InformationCardsProps> = ({data}: InformationCardsProps) => {
    const percentage = 40.5;
    return (
        <NewCardsSection>
          <NewCardsContainer >
            <Card maxWidth="346px">
              <NewCardContent>
                <NewCardInformation>
                  <NewCardTitle>My Investments</NewCardTitle>
                  <NewCardValue type='1'>
                    <h2>{data.myInvestments}</h2>
                    <span>ROCK</span>
                  </NewCardValue>
                </NewCardInformation>
                <NewCardImage>
                  <Image src={rock} />
                </NewCardImage>
              </NewCardContent>
            </Card>
            <Card maxWidth="346px">
              <NewCardContent>
                <NewCardInformation>
                  <NewCardTitle>My Pool Share</NewCardTitle>
                  <NewCardValue type='1'>
                    <h2>{data.poolShare}%</h2>
                  </NewCardValue>
                </NewCardInformation>
                <NewCardProgress>
                  <CircularProgressbar
                    value={data.poolShare}
                    styles={buildStyles({

                      pathColor: "#E98331"
                    })}
                  />

                </NewCardProgress>
              </NewCardContent>
            </Card>
            <Card maxWidth="346px">
              <NewCard3Content>
                  <div>
                    <NewCardTitle>Pool Balance</NewCardTitle>
                    <NewCardValue type='2'>
                      <h2>{data.poolBalance}k</h2>
                      <span>ROCK</span>
                    </NewCardValue>
                  </div>
                  <NewCard3BTCValue>
                    <span>1.53362 BTC</span>
                  </NewCard3BTCValue>
              </NewCard3Content>
            </Card>
          </NewCardsContainer>
        </NewCardsSection>
    )
}