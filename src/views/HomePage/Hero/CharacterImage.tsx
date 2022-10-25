import styled from "styled-components"

const CharacterImage = styled.div`

position: absolute;
width: 25%;
left:60%;
top: 27%;



@media (max-width:768px){
   top:55%;
   left:35%;
   width:33%;
   z-index:33;
}
@media (max-width:768px){
    top:50%;
    left:35%;
    width:33%;
    z-index:33;
 }

 @media (max-width:540px){
    top:65%;
    left:35%;
    width:33%;
    z-index:33;
 }

@media (max-width:480px){
    left:49%;
    transform:translateX(-50%);
    top:65%;
    width:67%;
    z-index:2;


}

@media (max-width:397px){
    left:50%;
    transform:translateX(-50%);
    top:73%;
    width:67%;
    z-index:2;


}
@media (max-width:390px){
    left:50%;
    transform:translateX(-50%);
    top:57%;
    width:67%;
    z-index:2;


}
@media (max-width:380px){
    left:50%;
    transform:translateX(-50%);
    top:65%;
    width:67%;
    z-index:2;


}
@media (max-width:360px){
    left:50%;
    transform:translateX(-50%);
    top:72%;
    width:67%;
    z-index:2;


}




`



export default CharacterImage 