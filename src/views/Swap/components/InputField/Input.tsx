import styled from "styled-components";

export const Input = styled.input`
    color: #ffffff;
    background-color: #000216;
    box-shadow: inset 0px 4px 50px rgba(209, 115, 93, 0.25);
    border-radius: 60px;
    width: 100%;
    padding: 4px 30px;
    font-size: 24px;
    font-weight: 400;
    border: none;
    &:focus {
        border: none;
        outline: none;
    }
`;