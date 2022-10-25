import styled from "styled-components";

interface StyledProps {

    marginTop?: any

}


const Rectangle1 = styled.div`
position: relative;
height: 10%;
width:100%;
z-index:1;
margin-top:${({ marginTop }: StyledProps) => marginTop ? marginTop : 0};

@media (max-width:768px){
    display:flex;
    justify-content:center;


   

}


@media (max-width:480px){
    display:flex;
    justify-content:center;
   

}





`

export default Rectangle1




















