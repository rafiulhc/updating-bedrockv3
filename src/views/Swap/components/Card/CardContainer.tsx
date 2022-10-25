import styled from "styled-components"

interface CardContainerProps {
    maxWidth: string;
}
export const CardContainer = styled.div<CardContainerProps>`
    width: 100%;
    max-width: ${({maxWidth}) => maxWidth ?? '100%'};
    box-sizing: border-box;
    border-radius: 16px;
    box-shadow: 0px 4px 50px rgba(136, 69, 83, 0.25), inset 0px 4px 50px rgba(236, 136, 69, 0.25), inset 0px 4px 50px rgba(209, 115, 93, 0.25);
    background-color: #000216;

    @media (max-width: 768px) {
        border-radius: 8px;
    }

`