import styled from "styled-components";

const Price = styled.div`
width:100px;
height:40px;
outline:1px solid #EC8845;
border-radius:20px;
padding:2px;
display:flex;
justify-content:space-evenly;
align-items:center;
color:#FFFFFF;
:hover{
    background:#EC8845
 }


 @media (max-width:992px){
    width:90px;
}
`

export default Price