import styled from "styled-components";

const CardsWrapper = styled.div`
// border:1px solid red;
width:40%;
display:flex;
justify-content:space-between;
flex-direction:column;
margin-top:110px;
gap:15px;
@media (max-width:768px){

    width:100%;
    min-height:100vh;
}
@media (max-width:480px){
    margin-top:30px;
}
`
export default CardsWrapper;