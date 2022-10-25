import styled from "styled-components"

const Parent = styled.div`
width:100%;
display:flex;
justify-content:center;
min-height:120vh;
margin-top:150px;
position:relative;
padding:10px 0;
gap:15px;
z-index:3;

@media (max-width:768px){
    flex-direction:column;
    
    height: auto;
}
@media (max-width:480px){
    margin-top:30px;
}
@media (max-width:380px){
    margin-top:150px !important;
}
`
export default Parent