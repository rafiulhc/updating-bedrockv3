import styled from "styled-components";

const CommentRow = styled.div`
position:relative;
width:90%;
height:85%;
margin-top:60px;
display:flex;
justify-content:space-between;
align-items:center;
overflow-y:hidden;
overflow-x:auto;

&::-webkit-scrollbar {
    display:none;
 }

`
export default CommentRow