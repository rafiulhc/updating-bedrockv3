import styled from "styled-components";

const ProjectWrapper = styled.div`
width:100%;

position:relative;
display:flex;
justify-content:space-evenly;
flex-direction:column;
align-items:center;
text-align:center;



&::-webkit-scrollbar {
    background:transparent;
    width:10px;
 };
 &::-webkit-scrollbar-thumb {
        background: #E98331;
 
        height:120px;
        width:10px;
        border-radius: 60px;
 
        
     };

`

export default ProjectWrapper