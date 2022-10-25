import styled from "styled-components"

interface CardBorderProps {
    padding?: string;
    maxWidth?: string;
}
export const CardBorder = styled.div<CardBorderProps>`
    padding: ${({padding}) => padding ?? '2px'};
    border-radius: 16px;
    width: 100%;
    max-width: ${({maxWidth}) => maxWidth ?? '100%'};
    background: rgb(236,136,64);
    background: linear-gradient(to bottom, rgba(236,136,64,1) 9%, rgba(209,115,93,1) 28%, rgba(136,69,83,1) 58%, rgba(135,50,66,1) 82%);

    @media (max-width: 768px) {
        border-radius: 8px;
    }
`