import styled from "styled-components";

interface StyledProps {
    outline?: any
    position?:string
    height?:string
    width?:string
    left?:string
    top?:string
    bottom?:string
    marginRight?:string
    background?:string
  }


const RockBtn=styled.button<StyledProps>`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
border:none;
outline:${({outline}:StyledProps)=>outline?`1px solid #EC8845`:"none"};
height:${ ({height}:StyledProps)=>height ? height:"45px"};
width:${({width}:StyledProps)=>width ? width:"147px"};
transform:translateX(-${props=>props.left && props.left});
color:#FFFFFF;
background: ${({background}:StyledProps)=>background?background:"none"};
border-radius: 60px;

@media (max-width:992px){
  width:90px;
}

`

export default RockBtn