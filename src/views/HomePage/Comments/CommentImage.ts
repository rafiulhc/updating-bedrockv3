import styled from "styled-components";

const CommentImage = styled.div`
width:120px;
height:100%;
border-radius:16px;

&>img{
    border-radius:16px;
}

@media (max-width:768px){
    display:flex;
    justify-content:center;
    align-items:center;
}


`

export default CommentImage