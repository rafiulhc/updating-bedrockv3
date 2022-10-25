import styled from "styled-components";

const PartnerWrapper = styled.div`

height:50vh;
width:100%;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;

@media (max-width:768px){
    justify-content:space-evenly;
    width:90%;
    margin:0 auto;
}
`

export default PartnerWrapper