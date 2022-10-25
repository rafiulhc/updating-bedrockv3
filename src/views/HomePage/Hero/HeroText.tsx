import styled from "styled-components";

const HeroText = styled.div`
position:absolute;
width:45%;
left:12%;
top:25%;
z-index:2;
@media (max-width:768px){
    left:50%;
    transform:translateX(-50%);
    top:20%;
    width:100%;
    text-align:center;

}
@media (max-width:480px){
    left:50%;
    transform:translateX(-50%);
    top:15%;
    width:100%;
    text-align:center;

}

`

export default HeroText;