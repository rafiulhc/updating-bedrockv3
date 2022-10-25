import styled from "styled-components";

const InvestmentHeader = styled.div`
width:80%;
height:20%;
margin:0 auto;
display:flex;
align-items:center;
justify-content:space-between;

@media (max-width:768px){
    height:20%;

    flex-direction:column
   
}

@media (max-width:480px){
    height:15%;

    flex-direction:column
   
}

`

export default InvestmentHeader