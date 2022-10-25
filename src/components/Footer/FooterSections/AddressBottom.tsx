import styled from "styled-components";

const AddressBottom = styled.div`

width:25%;
padding-left:20px;

padding-top:8px;
flex-direction:column;
align-items:center;
display:none;

@media (max-width:768px){
    display:block;
    width:90%;
    height:10%;
    margin:0 auto;
    padding-top:0;
    padding-left:0;
    text-align:center;
}
`
export default AddressBottom