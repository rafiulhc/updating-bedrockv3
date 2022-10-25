import styled from "styled-components";

const CommentsWrapper = styled.div`
position:relative;
width:95%;
display:flex;
justify-content:center;
margin-top:50px;
margin-left:auto;
margin-right:auto;
gap:20px;
align-items:center;
padding:5px 10px;

@media (max-width:768px){
    // height:80vh;
    display:flex;
    justify-content:center;
    flex-direction:center;
    margin-top:100px;

}

@media (max-width:480px){
    margin-top:150px;
}


`

export default CommentsWrapper