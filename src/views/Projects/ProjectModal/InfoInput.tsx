import styled from "styled-components";

interface StyledProps{
  width?:string,

}


const InfoInput=styled.input<StyledProps>`
background: #000216;
box-shadow: inset 0px 4px 50px rgba(209, 115, 93, 0.25);
outline:none;
border:none;
background: linear-gradient(0deg, #000216, #000216),linear-gradient(180deg, rgba(236, 136, 69, 0.25) 0%, rgba(209, 115, 93, 0.25) 27.4%, rgba(136, 69, 83, 0.25) 59.69%, rgba(135, 50, 66, 0.25) 100%);
border-radius:60px;
border: 1px solid;
padding:10px;
margin:10px 5px;
color:#FFFFFF;
width:${({width}:StyledProps)=>width ? width :"45%"};

border-image-source: linear-gradient(180deg, rgba(236, 136, 69, 0.25) 0%, rgba(209, 115, 93, 0.25) 27.4%, rgba(136, 69, 83, 0.25) 59.69%, rgba(135, 50, 66, 0.25) 100%);


&::-webkit-file-upload-button {
    visibility: hidden;
  }
 &::before {
    content: 'Upload';
    display: inline-block;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    border: 1px solid #EC8845;
border-radius: 60px;
color:white;
background:transparent;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
   
  }


  @media(max-width:768px){
    width:80%;
  }
`

export default InfoInput