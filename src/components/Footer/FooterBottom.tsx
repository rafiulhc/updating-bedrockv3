import styled from "styled-components"


interface styledProps{
  width?:any
}

const FooterBottom = styled.div<{ width }>`
  position:relative;
  width: 100%;
  min-height:50vh;
  background-image:url('/images/footerRect2.svg')


  background-repeat: no-repeat;


  background-size:cover;
  background-position:center;
 
  
  background-color: #EC8845;
  

 
  @media only screen and (max-width:1500px){
    height: 30vh;
  }
  @media only screen and (max-width:1100px){
    margin-top:-5px;
  }
  @media (max-width:768px)
  {
    background-image:url('/images/footerMobileRect.svg');
    min-height:150vh;
    background-position:left top;
    background-color: transparent;

  }

`
export default FooterBottom





