import styled from "styled-components";


const VideoRow=styled.div`

position:absolute;
width:100%;
height:20%;
top:98%;
z-index:2;
display:flex;
justify-content:center;

@media (max-width:480px){
    top:150%;
    display:flex;
    align-items:center;
    overflow-x:auto;
    gap:50px;
    height:30%;
    width:100%;
    justify-content:space-evenly;

}


::-webkit-scrollbar{
    display:none;
}
`

export default VideoRow