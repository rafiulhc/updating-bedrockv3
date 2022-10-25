import styled from "styled-components";



interface StyledProps{

background?:string


}

const DotSlider=styled.span<StyledProps>`
width:10px;
height:10px;
border-radius:20px;
margin-left:10px;
background-color:${({background}:StyledProps)=>background && background};
float:left;

`

export default DotSlider

