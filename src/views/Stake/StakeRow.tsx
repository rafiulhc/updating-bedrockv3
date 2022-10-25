import styled from "styled-components";

const StakeRow=styled.div`

height:70vh;
width:100%;
position:relative;
margin:40px 0;
display:flex;
justify-content:space-evenly;
align-items:center;

@media (max-width:480px){
    flex-direction:column;
    justify-content:center;
    margin:20px 0;

    gap:10px;
    height:90vh;
}


`
export default StakeRow