import React from 'react';
import styled from 'styled-components';

const SwapButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Swap = styled.div`
    background-color: transparent;
    border: 2px solid #E98331;
    border-radius: 60px;
    height: 52px;
    width: 37px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
        box-shadow: 0px 4px 50px rgba(136, 69, 83, 0.25);
    }
`

const BottomArrowLong = () => {
    return (
        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 0.435791L5.5 14.6058L1.91 11.0258L0.5 12.4358L6.5 18.4358L12.5 12.4358L11.09 11.0258L7.5 14.6058L7.5 0.435791H5.5Z" fill="#E98331"/>
        </svg>
    )
}

interface SwapButtonProps {
    onPress: React.MouseEventHandler<HTMLDivElement>;
}
export const SwapButton: React.FC<SwapButtonProps> = ({ onPress }: SwapButtonProps) => {

    return (
        <SwapButtonContainer>
            <Swap onClick={onPress}>
                <BottomArrowLong></BottomArrowLong>
            </Swap>
        </SwapButtonContainer>
    )
}
