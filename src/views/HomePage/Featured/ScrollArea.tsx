import styled from "styled-components";
const ScrollArea = styled.div`
position:relative;
top: 50%;
-ms-transform: translateY(-50%);
transform: translateY(-50%);
min-width:100%;
display:flex;
flex: 0 0 auto;
gap:10px;
align-items:center;
overflow-y:hidden;

overflow-x:auto;
&::-webkit-scrollbar {
   display:none;
}

@media (max-width:768px){

   width:100%;
}
`
export default ScrollArea