import styled from "styled-components";

const WorkRow=styled.div`

width:100%;
height:10%;
display:flex;
justify-content:flex-start;
align-items:center;
gap:10px;
margin:auto 0;
position:relative;

@media (max-width:480px){
   
    gap:40px;
    align-items:flex-start;
    margin:auto 0;


}
`
export default WorkRow