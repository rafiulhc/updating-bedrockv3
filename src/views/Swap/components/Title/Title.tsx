import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: #ffffff;
`

const TitleTextContainer = styled.div`
    max-width: 1012px;
    text-align: center;

    @media (max-width: 768px) {
        max-width: 314px;
    }
`

const TitleText = styled.h1`
    font-size: 120px;
    font-weight: 400;
    line-height: 109.5%;
    padding: 30px 10px;

    @media (max-width: 768px) {
      font-size: 50px;
    }
`

interface TitleProps extends PropsWithChildren {}
export const Title: React.FC<TitleProps> = ({children}: TitleProps) => {
    return (
        <TitleContainer>
            <TitleTextContainer>
                <TitleText>
                    {children}
                </TitleText>
            </TitleTextContainer>
        </TitleContainer>
    )
}