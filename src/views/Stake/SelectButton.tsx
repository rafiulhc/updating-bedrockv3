import styled from "styled-components";

const SelectButton=styled.div`

background: #000216;
box-shadow: inset 0px 4px 50px rgba(209, 115, 93, 0.25);
outline:none;
border:none;
background: linear-gradient(0deg, #000216, #000216),linear-gradient(180deg, rgba(236, 136, 69, 0.25) 0%, rgba(209, 115, 93, 0.25) 27.4%, rgba(136, 69, 83, 0.25) 59.69%, rgba(135, 50, 66, 0.25) 100%);
border-radius:60px;
border: 1px solid;
padding:10px;
color:#FFFFFF;
border-image-source: linear-gradient(180deg, rgba(236, 136, 69, 0.25) 0%, rgba(209, 115, 93, 0.25) 27.4%, rgba(136, 69, 83, 0.25) 59.69%, rgba(135, 50, 66, 0.25) 100%);

width:100%;
position:relative;
color:#FFFFFF;
border-radius:60px;

&:after {
    content: url("/images/arrowdown.png");
    position: absolute;
  
    top: 17%;
    left: 90%;

  
  }

`
export default SelectButton