import styled from "styled-components";

interface StyledProps {
    left?: string
    top?: string
    Width?: string
    background?: string
    height?: string
    right?: string

}

const ImageBackground = styled.div<StyledProps>`


border-radius:50px;
filter: blur(80px);
position: absolute;
z-index:0;




width:${({ Width }: StyledProps) => Width ? Width : ""};
top: ${({ top }: StyledProps) => top ? top : ""};
left: ${({ left }: StyledProps) => left ? left : ""};
right: ${({ right }: StyledProps) => right ? right : ""};
background: ${({ background }: StyledProps) => background ? background : ""};
height:${({ height }: StyledProps) => height ? height : ""};



`

export default ImageBackground