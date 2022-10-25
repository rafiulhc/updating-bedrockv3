import styled from "styled-components";


interface StyledProps {

    color?: any
}

const Li = styled.li<StyledProps>`

font-weight: 325;
font-size: 16px;
line-height: 19px;
letter-spacing: 0.02em;

color: #FFFFFF;

list-style:none;

flex: none;
order: 1;
flex-grow: 0;

&:first-child {
    color:#E98331;

}

@media (max-width:768px){
    gap:10px;
    text-align:center;
    margin: 0 auto;
}
@media (max-width:1280px){
    font-size: 13px;
}

a{
    text-decoration:none;

    color:${({ color }: StyledProps) => color ? "#E98331" : "#FFFFFF"};
}
a:hover{
    opacity:0.7;
}


@media (max-width:768px){
    a{
        text-decoration:none;
    
        color:${({ color }: StyledProps) => color ? "#000000" : "#FFFFFF"};
    }
}

`
export default Li;