import styled from "styled-components";

const Balance = styled.div`

position:absolute;
top:10%;
left:45%;
width:50%;

@media(max-width:836px){
    left:38%;
}

@media (max-width:768px){

    left:40%;
    margin-right:20px;
   
    text-align:right;
}
`
export default Balance;