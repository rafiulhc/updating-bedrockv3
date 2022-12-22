import React from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import Image from 'next/image';
import Character from "../../../../assets/images/character.png";

const HeroSection = styled.div`
    padding: 0 10% 200px 10%;
`

const HeroContentContainer = styled.div`
    display: flex;
    gap: 10px;

    &>div {
        flex: 1 1 100%;
    }
`
const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    color: #ffffff;

    @media (max-width: 768px) {
        align-items: center;
    }
`
const HeroContentTitle = styled.h1`
    font-size: 120px;

    @media (max-width: 768px) {
        font-size: 50px;
    }
`
const HeroContentText = styled.p`
    font-size: 24px;
    opacity: 0.75;

    @media (max-width: 768px) {
        font-size: 16px;
        text-align: center;
    }
`
const HeroImageContainer = styled.div`
    display: flex;
    justify-content: right;

    @media (max-width: 1000px) {
        display: none;
    }
`
interface HeroProps {
    onClickReferalLink: () => void;
}
export const Hero: React.FC<HeroProps> = ({onClickReferalLink}: HeroProps) => {

    return (
        <HeroSection>
            <HeroContentContainer>
                <HeroContent>
                    <HeroContentTitle>Staking</HeroContentTitle>
                   {/*<HeroContentText>Refer and get up to 5% free rewards when they stake for more than 6 months!</HeroContentText>*/}
                    <Button  position="static" outline onClick={() => onClickReferalLink()}>Copy Referal Link</Button>
                </HeroContent>
                <HeroImageContainer>
                    <Image src={Character} />
                </HeroImageContainer>
            </HeroContentContainer>
        </HeroSection>
    )
}