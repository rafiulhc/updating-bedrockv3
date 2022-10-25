import styled from "styled-components";

interface StyledProps{
    left?:string
    top?:string
}





const StakeDescription=styled.h1<StyledProps>`




font-weight: 325;
left:${({left}:StyledProps)=>left && left};
top:${({top}:StyledProps)=>top && top};
font-size:18px;
color: #FFFFFF;

opacity: 0.75;

@media (max-width:480px){
    text-align:center;
}
`
export default StakeDescription;