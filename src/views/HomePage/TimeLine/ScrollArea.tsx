import styled from "styled-components";

interface StyledProps{
   width
}

const Container = styled.div`
position:relative;
min-width:100%;


      
height:500px;
display:flex;
margin-top:20px;
flex: 0 0 auto;
gap:10px;
align-items:center;
overflow-y:hidden;
overflow-x:auto;

// width: 100%;
// height: 500px;
// white-space: nowrap;
// position: relative;
// overflow-x: scroll;
// overflow-y: hidden;
// -webkit-overflow-scrolling: touch;
// border:1px solid red;


&::-webkit-scrollbar {
   display:none;
}

@media (max-width:768px){
   height:280px;
top:15%;
}
@media (max-width:480px){
   height:280px;
top:15%;
}
`
export default Container