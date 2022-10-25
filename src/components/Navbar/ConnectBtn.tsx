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



const ConnectBtn=styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
border:none;
outline:${({outline}:StyledProps)=>outline?`1px solid #EC8845`:"none"};


height:${ ({height}:StyledProps)=>height ? height:"45px"};
width:147px;




color:#FFFFFF;

background: ${({background}:StyledProps)=>background?background:"none"};
border-radius: 60px;



@media (max-width:1200px){
    width:130px;
}
@media (max-width:1024px){
    width:120px;
    font-size:13px;
}

@media (max-width:992px){
    width:110px;
}
`

export default ConnectBtn