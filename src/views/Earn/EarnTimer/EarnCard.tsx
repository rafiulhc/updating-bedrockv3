import styled from "styled-components";
import Card from "../../../components/Card";
const EarnCard=styled(Card)`

width:30%;
height:80%;
position:relative;
padding:20px;
display:flex;
justify-content:space-around;
flex-direction:column;
gap:10px;

@media (max-width:480px){
    width:100%;
    margin:10px 0;
}

`

export default EarnCard