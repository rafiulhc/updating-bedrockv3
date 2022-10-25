import styled from "styled-components";

const Menu = styled.div`
position: absolute;
width:50px;
height:100%;
left: 80%;
display:none;
@media (max-width:768px){
    left: 90%;
    display:block;
    height:50px;
    top:70px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;


}
@media (max-width:480px){
    left: 80%;
    top:30px;
    


}

`

export default Menu;