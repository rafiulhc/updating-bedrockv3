import styled from "styled-components";
import Card from "../../../components/Card";
const TabCard=styled(Card)`

width:50%;
height:70%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
margin:0 auto;
gap:10px;

@media (max-width:480px){
    width:80%;
    overflow-y:auto;
    
}
`

export default TabCard