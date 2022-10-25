import styled from "styled-components";

const TabContainer=styled.div`
width:100%;
height:70%;
display:flex;

justify-content:space-between;
flex-direction:column;


@media (max-width:480px){
    overflow-x:auto;
}
`

export default TabContainer