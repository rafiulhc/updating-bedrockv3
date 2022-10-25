import React from "react";
import styled from "styled-components";
import { Blob1 } from '../Blobs/Blob1';
import { Blob2 } from '../Blobs/Blob2';
import { Blob2Corner } from '../Blobs/Blob2Corner';

interface BlobSharedProps {
    zIndex?: string;
}
const Blob2Container = styled.div<BlobSharedProps>`
  z-index: ${({zIndex}) => zIndex ?? '-1'};
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
`;

const Blob1Container = styled.div<BlobSharedProps>`
  z-index: ${({zIndex}) => zIndex ?? '-1'};
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
`;

interface BackgroundProps {
    isMobile: boolean;
    zIndex?: string;
}
export const Background: React.FC<BackgroundProps> = ({isMobile,zIndex}: BackgroundProps) => {

    return (
        <>
            <Blob2Container zIndex={zIndex}>
                {isMobile ? <Blob2Corner /> : <Blob2 />}
            </Blob2Container>
            <Blob1Container zIndex={zIndex}>
                <Blob1 />
            </Blob1Container>
        </>
    )
}