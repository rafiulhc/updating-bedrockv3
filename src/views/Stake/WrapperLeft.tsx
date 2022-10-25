import styled from "styled-components";

const WrapperLeft=styled.div`
width:50%;
height:85vh;
display:flex;
justify-content:center;
flex-direction:column;
margin-left:10%;
padding-bottom:5%;
@media (max-width:480px){
    height:30vh;
    width:100%;
    align-items:center;
    margin:0 auto;
}
`

export default WrapperLeft