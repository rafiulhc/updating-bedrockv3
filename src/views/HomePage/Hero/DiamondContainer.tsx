import styled from "styled-components";

interface StyledProps {
    left?: string
    top?: string

}


const DiamondContainer = styled.div<StyledProps>`

position:absolute;
z-index:2;
left:${({ left }: StyledProps) => left && left};
top:${({ top }: StyledProps) => top && top};
width:200px;
height:200px;


@media (max-width:480px){
    width:100px;
    height:50px;
    
}

`

export default DiamondContainer