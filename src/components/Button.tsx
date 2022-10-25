import styled from "styled-components"

interface StyledProps {
  outline?: any
  position?: string
  height?: string
  width?: string
  left?: string
  top?: string
  bottom?: string
  marginRight?: string
  background?: string
  marginTop?: string
  fontSize?: string
}


const Button = styled.button<StyledProps>`
z-index=1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border:none;
  outline:${({ outline }: StyledProps) => outline ? `1px solid #EC8845` : "none"};

  position:${({ position }: StyledProps) => position ? position : "absolute"};

  height:${({ height }: StyledProps) => height ? height : "45px"};
  width:${({ width }: StyledProps) => width ? width : "147px"};

  left:${({ left }: StyledProps) => left && left};
  transform:translateX(-${props => props.left && props.left});
  top:${({ top }: StyledProps) => top && top};
  bottom:${({ bottom }: StyledProps) => bottom && bottom};
  margin-right:${({ marginRight }: StyledProps) => marginRight && marginRight};
  margin-top:${({ marginTop }: StyledProps) => marginTop && marginTop};
  font-size:${({ fontSize }: StyledProps) => fontSize && fontSize};

  color:#FFFFFF;

  background: ${({ background }: StyledProps) => background ? background : "none"};
  border-radius: 60px;
  :hover{
    background: #EC8845;
  }
  :focus{
    outline:${({ outline }: StyledProps) => outline ? `1px solid #EC8845` : "none"};

  }
`

export default Button