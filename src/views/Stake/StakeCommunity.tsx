import styled from "styled-components";

const StakeCommunity=styled.div`

height:70vh;
width:100%;
position:relative;
margin:40px 0;
display:flex;
justify-content:space-evenly;
align-items:center;
@media (max-width:480px){
 flex-direction:column;   
 margin:10px 0;

 height:55vh;
 justify-content:center;
 gap:15px;
}


`
export default StakeCommunity