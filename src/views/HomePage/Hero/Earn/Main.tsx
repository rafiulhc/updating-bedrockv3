import styled from "styled-components";

const Main = styled.div`
// position:absolute;
position:relative;
width:80%;
min-height:30%;
margin-left:auto;
margin-bottom:500px;

// top:73%;
// left:20%;
z-index:5;
display:flex;
justify-content:space-between;
@media (max-width:768px){

    width:100%;
    left:0%;
    flex-direction:column;
    top:100%;

}

`

export default Main;