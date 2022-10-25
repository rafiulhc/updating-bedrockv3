import styled from "styled-components";

const LinksRow = styled.div`
position:absolute;

background: #EC8845;

left:50%;
bottom:0%;
transform:translateX(-50%);
padding:0 10px;
width:90%;
height:100%;
display:flex;
justify-content:space-between;

@media(max-width:992px){
    width:95%;

}
@media (max-width:768px){
    
    height:100vh;
    padding-top:30px;
    flex-direction:column;
    justify-content:center;

}
@media (max-width:480px){
    height:90vh;

    margin-top: 230px;
    bottom:20%;
 
}
@media (max-width:390px){
    margin-top: 230px;
    bottom:20%;

 
}

`

export default LinksRow