import styled from "styled-components";
const CommentDetail = styled.div`


position :relative;
width:150px;
height:100%;
padding:50px 0;
display:flex;
margin-left:0px;

flex-direction:column;
line-height: 1.45;

@media (max-width:480px){
    padding:35px 0;
    
}

&:after{
    content:"";
    position:absolute;
    width:20%;
    height:2%;
    top:70%;
    background: #E98331;

    @media (max-width:768px){
        top:88%;
        height:3%;
        width:20%;
    }
    @media (max-width:480px){
        top:80%;
       
    }


}


`
export default CommentDetail