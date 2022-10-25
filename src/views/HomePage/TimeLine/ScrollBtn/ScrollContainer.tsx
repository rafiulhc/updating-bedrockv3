import styled from "styled-components";
interface StyledProps {
    Top?: any
}

const ScrollContainer = styled.div<StyledProps>`
position:absolute;
left:85%;


top: ${({ Top }: StyledProps) => Top ? Top : "25%"};
// top:25%;
width:11%;
height:20%;
display:flex;
justify-content:space-between;
z-index:3;

`
export default ScrollContainer