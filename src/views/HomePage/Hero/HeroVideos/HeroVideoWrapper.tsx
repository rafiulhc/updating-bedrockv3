import styled from "styled-components";

const HeroVideoWrapper = styled.div`

width:100%;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
// height:70vh;

position: relative;


@media (max-width:992px){
    margin-top:10px;
}
@media (max-width:768px){
    margin-top:400px;
    height:40vh;

   
}
@media (max-width:768px){
    margin-top:400px;
    height:60vh;
    width:100%;
   
}
`

export default HeroVideoWrapper