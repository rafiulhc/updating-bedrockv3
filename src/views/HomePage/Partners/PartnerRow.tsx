import styled from "styled-components";

interface StyledProps{
    padding?:string
}

const PartnerRow = styled.div<StyledProps>`
width:100%;
margin:0 auto;
display:flex;
justify-content:space-between;
padding:${({padding}:StyledProps)=>padding ? padding : "10px 10%"};

`

export default PartnerRow