import styled from "styled-components";

const FooterCharacter = styled.div`
position:absolute;
left:28%;
top:30%;
width:20%;
height:20%;
z-index:3;

@media only screen and (max-width:1500px){
    top:40%;
  
  
  }

@media (max-width:768px){

    top:0%;
    left:50%;
    width:40%;
    height:40%;
}
@media (max-width:480px){

  top:0%;
  left:30%;
  width:55%;
  height:40%;
}




`
export default FooterCharacter