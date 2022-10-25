import styled from "styled-components";
import Card from "../../../../../components/Card";

interface StyledProps {

    position?: string

}

const BottomCardContainer = styled(Card) <StyledProps>`


display:flex;
position:${({ position }: StyledProps) => position && position};



background-image:url("/images/layers.png"),linear-gradient(151.43deg, #E89257 17.63%, #ED8745 34.02%, #D2735D 49.53%, #884654 66.05%, #893242 82.37%);

justify-content:space-around;
align-items:center;
color:#FFFFFF;
width:95%;
height:60%;
margin-right:auto;


@media (max-width:768px){
    margin:0 auto;
    margin-top:20px;
    height:55vh;
    width:90%;

}
@media (max-width:480px){
   
    height:50vh;
    width:90%;

}


`

export default BottomCardContainer