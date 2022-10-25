import styled from "styled-components";

const CommunityHeader = styled.div`

width:100%;
height:70vh;
display:flex;
justify-content:center;
gap:35px;
margin-top:100px;
background-color: #000216;
position:relative;
z-index:5;
@media (max-width:768px){
    height:80vh;
    flex-direction:column;
}
@media (max-width:480px){
    margin-top:15px;
    height:70vh;
    margin-bottom:90px;
}



`

export default CommunityHeader

