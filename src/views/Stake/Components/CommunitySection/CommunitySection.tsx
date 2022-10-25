import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../Swap/components/index';
import Image from 'next/image';
import people from "../../../../assets/images/community.png";
import coins from "../../../../assets/images/coins.png";
import { StaticImageData } from 'next/image';

const CommunitySectionContainer = styled.div`
    padding: 0 5%;
`
const CommunityContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CommunitySectionTitle = styled.h1`
    color: #ffffff;
    font-size: 50px;
    margin-bottom: 60px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 30px;
        margin-bottom: 30px;
    }
`
const CommunityCardsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 30px;
    &>div {
        flex: 1 1 50%;
    }

    flex-wrap: wrap;
`
const CardContentContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;

    @media (max-width: 763px) {
        padding: 20px;
    }
`
const CardTitle = styled.h3`
    color: #ffffff;
    opacity: 0.75;
    font-size: 18px;
`
const CardValue = styled.h1`
    color: #ffffff;
    font-size: 50px;
`

export interface CommunityCardData {
    title: string;
    value: string;
    img: StaticImageData
}
interface CommunitySectionProps {
    card1: CommunityCardData;
    card2: CommunityCardData;
}
export const CommunitySection: React.FC<CommunitySectionProps> = ({card1, card2}: CommunitySectionProps) => {

    return (
        <CommunitySectionContainer>
            <CommunityContentContainer>
                <CommunitySectionTitle >Overall Community Staking Stats</CommunitySectionTitle>
                <CommunityCardsContainer>
                    <Card maxWidth='540px' width='100%' height='216px'>
                        <CardContentContainer>
                            <div>
                                <CardTitle>{card1.title}</CardTitle>
                                <CardValue>{card1.value}</CardValue>
                            </div>
                            <Image src={card1.img} />
                        </CardContentContainer>
                    </Card>
                    <Card maxWidth='540px' width='100%' height='216px'>
                        <CardContentContainer >
                            <div>
                                <CardTitle>{card2.title}</CardTitle>
                                <CardValue>{card2.value}</CardValue>
                            </div>
                            <Image src={card2.img} /> 
                        </CardContentContainer>
                    </Card>
                </CommunityCardsContainer>
            </CommunityContentContainer>
        </CommunitySectionContainer>
    )
}