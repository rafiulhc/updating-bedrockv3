import styled from "styled-components";

const CurvesConainer = styled.div`
position:relative;
width:100%;
margin-top:-380px;
z-index:1;

@media (max-width:768px){
    margin-top:-150px;
    z-index:1;
}
@media (max-width:540px){
    margin-top:8px;
    z-index:1;
}
@media (max-width:480px){
    margin-top:-150px;
    z-index:1;
}
@media (max-width:390px){
    margin-top:-260px;
    z-index:1;
}
@media (max-width:380px){
    margin-top:-150px;
    z-index:1;
}
`

export default CurvesConainer