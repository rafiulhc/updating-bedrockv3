import styled from "styled-components";

import Card from "../../components/Card";

interface StyledProps{
    flexDirection?:string
    height?:string

}


const StakeCard=styled(Card)<StyledProps>`
height:50%;
width:30%;
position:relative;
display:flex;
gap:10px;

padding:30px 20px;
flex-direction:${({flexDirection}:StyledProps)=>flexDirection ? flexDirection:"column" };



@media (max-width:480px){
    width:80%;
height:${({height}:StyledProps)=>height ? height :"20vh"};
    
}
`

export default StakeCard