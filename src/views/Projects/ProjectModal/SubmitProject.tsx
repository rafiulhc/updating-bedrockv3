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
}


const SubmitProject = styled.button<StyledProps>`

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border:none;
  outline:${({ outline }: StyledProps) => outline ? `1px solid #EC8845` : "none"};

//   position:${({ position }: StyledProps) => position ? position : "absolute"};

  height:${({ height }: StyledProps) => height ? height : "45px"};
  width:${({ width }: StyledProps) => width ? width : "147px"};

//   left:${({ left }: StyledProps) => left && left};
//   transform:translateX(-${props => props.left && props.left});
//   top:${({ top }: StyledProps) => top && top};
//   bottom:${({ bottom }: StyledProps) => bottom && bottom};
//   margin-right:${({ marginRight }: StyledProps) => marginRight && marginRight};
//   margin-top:${({ marginTop }: StyledProps) => marginTop && marginTop};

  color:#FFFFFF;
  margin:0 auto;

  background: ${({ background }: StyledProps) => background ? background : "none"};
  border-radius: 60px;
  :hover{
    background: #EC8845;
  }
`

export default SubmitProject