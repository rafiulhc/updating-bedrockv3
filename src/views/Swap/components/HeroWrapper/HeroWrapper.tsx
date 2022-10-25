import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
    position: relative;
    z-index: 1;
    padding-bottom: 200px;
`
const Blob2Container = styled.div`
    z-index: -1;
    position: absolute;
    top: 0px;
    left: 50%;
    width: 900px;
    filter: blur(270px);

    @media (max-width: 768px) {
        top: 250px;
        width: 100%;
        filter: blur(100px);
    }
`

const Blob1Container = styled.div`
    z-index: -1;
    position: absolute;
    bottom: 0;
    right: 50%;
    width: 900px;
    filter: blur(150px);

    @media (max-width: 768px) {
        width: 100%;
        filter: blur(100px);
        left: 0;
        bottom: 200px;
    }
`
export const HeroWrapper: React.FC<PropsWithChildren> = ({children}) => { 
    return (
        <ContentContainer>
            <Blob2Container>
                {/* <Blob2 /> */}
            </Blob2Container>
        </ContentContainer>
    );
}