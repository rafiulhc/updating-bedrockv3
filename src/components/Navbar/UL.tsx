import styled from "styled-components"


interface StyledProps {
    display?: any
}

const UL = styled.ul<StyledProps>`
    margin:auto 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    justify-content:space-evenly;
    margin-left:7%;

    width:50%;



    @media (max-width:992px){
       margin-left:5%;
    }
    @media (max-width:920px){
        margin-left:3%;
     }
    @media (max-width:768px){
        flex-direction:column;
        top:20%;
        left:50%;
        transform:translate(-50%);
        height:50%;
        display:${({ display }: StyledProps) => display && display};
    }

    
`

export default UL