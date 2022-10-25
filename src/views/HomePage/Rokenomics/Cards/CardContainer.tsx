import styled from "styled-components";
import Card from "../../../../components/Card";


interface StyledProps {
    position?: string
}


const CardContainer = styled(Card) <StyledProps>`


display:flex;
position:${({ position }: StyledProps) => position && position};
justify-content:space-around;
align-items:center;
color:#FFFFFF;
width:95%;
height:45%;
margin-right:auto;
padding:15px;



@media (max-width:768px){
    margin:0 auto;
    flex-direction:column-reverse;
    height:60vh;
    padding-top:50px;
    width:90%;

}
@media (max-width:480px){
   
    
    padding-top:50px;
    width:90%;

}


`

export default CardContainer