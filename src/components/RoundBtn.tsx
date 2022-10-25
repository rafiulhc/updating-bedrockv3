import styled from "styled-components"

interface StyledProps {
  width?: any
  height?: any
  top?: any
  left?: any
  position?: any
  marginLeft?: any
  marginRight?: any
  marginTop?: any
  marginBottom?: any
}


const RoundBtn = styled.button<StyledProps>`
  width: ${({ width }: StyledProps) => width ? width : "56px"};
  height: ${({ height }: StyledProps) => height ? height : "56px"};
  color:#763B4D;
  background: #38181F;
  border-radius:56px;
  outline:none;
  border:none;
  top:${({ top }: StyledProps) => top && top};
  left:${({ left }: StyledProps) => left && left};
  margin-left:${({ marginLeft }: StyledProps) => marginLeft && marginLeft};
  margin-right:${({ marginRight }: StyledProps) => marginRight && marginRight};
  margin-top:${({ marginTop }: StyledProps) => marginTop && marginTop};
  margin-bottom:${({ marginBottom }: StyledProps) => marginBottom && marginBottom};

  position:${({ position }: StyledProps) => position && position};

  @media (max-width:768px){
      display:none;
  }

  &:active{
      transform: scale(.6);
  }

  :hover{
      background:#EC8845;
  }
`

export default RoundBtn