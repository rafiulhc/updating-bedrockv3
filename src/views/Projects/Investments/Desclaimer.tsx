import styled from "styled-components";

const Desclaimer = styled.div`
width:50%;
height:40vh;
margin:40px auto;
display:flex;
align-items:center;
justify-content:space-evenly;
flex-direction:column;
text-align:center;
position: relative;
z-index: 1;

@media(max-width:768px){
width:90%;
margin:0px auto;

}

`

export default Desclaimer