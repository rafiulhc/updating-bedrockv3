import styled from "styled-components";

const Main = styled.div`
position:relative;
width:80%;
margin-left:auto;
margin-top:-400px;
float:right;

z-index:1;
display:flex;
justify-content:space-between;


@media (max-width:1100px){
    margin-top:-350px;

}
@media (max-width:930px){
    margin-top:-330px;

}

@media (max-width:930px){
    margin-top:-300px;

}

@media (max-width:768px){
 
margin-top:0;    
    width:100%;
    left:0%;
    flex-direction:column;
    top:100%;

}

`

export default Main;