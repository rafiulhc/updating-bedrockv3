import styled from "styled-components";

const AddressTop = styled.div`

width:25%;
padding-left:20px;

padding-top:8px;
flex-direction:column;
align-items:center;

@media (max-width:768px){
    display:none;
    width:90%;
    height:10%;
    margin:0 auto;
    padding-top:0;
    padding-left:0;
    text-align:center;
}
`
export default AddressTop