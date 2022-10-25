import styled from "styled-components";
import Card from "../../../components/Card";

interface StyledProps{
    border?:any
    color?:any
}

const TabItem=styled.div<StyledProps>`

width:20%;
display:flex;
justify-content:center;
align-items:center;

border-bottom:${({border}:StyledProps)=>border && "1px solid #E98331"};
color:${({color}:StyledProps)=>color ? "#E98331":"#FFFFFF"};

`

export default TabItem