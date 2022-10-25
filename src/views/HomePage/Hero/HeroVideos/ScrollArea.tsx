import styled from "styled-components";
const Container = styled.div`
position:relative;
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

}
@media (max-width:480px){

}
`
export default Container