import styled from "styled-components";

const CharacterImageBackground = styled.div`
background: rgba(236, 136, 69, 0.5);

border-radius:50px;
filter: blur(100px);
position: absolute;
width:130%;
left:-2%;
top: 0%;
height:130%;
@media only screen and (max-width: 990px){
    width:150px;
    top: -10%;


}


`

export default CharacterImageBackground