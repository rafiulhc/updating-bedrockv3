import styled from "styled-components"


interface StyledProps{
  width?:any
}

const FooterHeader = styled.div<{ width }>`
  position:relative;
  width: 100%;
  background-image:url(${({width}:StyledProps) => width <= 768 ? '/images/footerMobileRect.svg' : '/images/footerRect1.svg'});


  background-size:cover;
  background-position:center center;
  background-repeat:no-repeat;
 
  
  background-color: #000216;
height:60vh;
  
  
  @media (max-width:768px)
  {
    display:none;

    height:0;
    min-height:80vh;
    background-position:left top;
  }

`
export default FooterHeader





