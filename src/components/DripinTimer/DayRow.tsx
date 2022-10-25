import styled from "styled-components"

const DayRow = styled.div`
width:370px;
height:50px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
gap:40px;
color:#FFFFFF;

@media (max-width:768px){
    width:100%;
    height:35%;
    justify-content:space-around;
    gap:0;
    // padding:0 10px;
    padding-right:5px;

}

`

export default DayRow