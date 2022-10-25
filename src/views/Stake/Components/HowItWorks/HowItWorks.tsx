import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import tick from "../../../../assets/images/tick.png";

const HowItWorksSection = styled.div`
    padding: 140px 10%;

    @media (max-width: 768px) {
        padding: 100px 3%;
    }
`
const HowItWorksContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    
    &>div {
        flex: 1 1 100%;
    }
    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`
const HowItWorksTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`
const HowItWorksTitle = styled.h1`
    font-size: 50px;
    color: #ffffff;

    @media (max-width) {
        font-size: 30px;
    }
`
const HowItWorksText = styled.div`
    color: #ffffff;    
    font-size: 24px;
    opacity: 0.75;
    display: flex;
    gap: 15px;

    &>div {
        margin-top: 10px;
        flex: 0 0 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: flex-start; 
    }
`
const HowItWorksVideoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 350px;
`

const Iframe = styled.iframe`
    width:100%;
    height:100%;
    border-radius:10px;
`
interface HowItWorksProps extends PropsWithChildren {
    title: string;
    paragraphs: string[];
    hideVideo?: boolean;
}
export const HowItWorks: React.FC<HowItWorksProps> = ({title, paragraphs, children, hideVideo}) => {

    return (
        <HowItWorksSection>
            <HowItWorksContainer>
                <HowItWorksTextContainer>
                    <HowItWorksTitle>How It Works</HowItWorksTitle>
                    {paragraphs.map(para => (
                        <HowItWorksText>
                            <div>
                                <Image width={'17px'} height={'17px'} src={tick} />
                            </div>
                            <span>
                                {para}
                            </span>
                        </HowItWorksText>
                    ))}
                </HowItWorksTextContainer>
                {(!hideVideo) && (
                <HowItWorksVideoContainer>
                    <Iframe src="https://www.youtube.com/embed/FsON37LULqc"></Iframe>
                </HowItWorksVideoContainer>
                )}
            </HowItWorksContainer>
        </HowItWorksSection>
    )
}