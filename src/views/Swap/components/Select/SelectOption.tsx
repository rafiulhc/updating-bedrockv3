import styled from "styled-components"

export const SelectOption = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 100%;
    padding: 20px 25px;
    color: #ffffff;
    gap: 25px;

    background-color: rgba(0,0,0,0);
    &:hover {
        background-color: rgba(255,255,255,0.25);
        cursor: pointer;
    }
`
