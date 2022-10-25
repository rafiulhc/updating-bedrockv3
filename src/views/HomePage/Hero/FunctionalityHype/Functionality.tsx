import styled from "styled-components"

const Functionality = styled.div`

position:absolute;
z-index:3;
width:80%;
top:50%;
transform:translateY(-50%);
display:flex;



margin-left: 10%;



@media (max-width:768px){
   width:85%;
}

@media (max-width:768px){
    flex-direction:column;
    justify-content:center;
}


`
export default Functionality