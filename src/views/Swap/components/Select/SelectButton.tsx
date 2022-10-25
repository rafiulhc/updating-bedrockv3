import styled from "styled-components"

export const SelectButton = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 150px;
    font-size: 18px;
    font-weight: 300;
    color: #ffffff;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    &:hover {
        cursor: pointer;
    }
`