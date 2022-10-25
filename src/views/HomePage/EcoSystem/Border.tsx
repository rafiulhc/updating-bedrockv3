import styled from "styled-components";

interface StyledProps{

  left?:string
  top?:string
  right?:string
  width?:string
  height?:string
  borderLeft?:any
  borderRight?:string
  borderBottom?:string
  borderTop?:any
}



const Border = styled.div<StyledProps>`
  position: absolute;
  left: ${({left}:StyledProps) => left && left};
  top: ${({top}:StyledProps) => top && top};
  right: ${({right}:StyledProps) => right && right};
  width:${({width}:StyledProps)=>width ? width : "2px"};
  height:${({height}:StyledProps)=>height && height};
  border-left:${({borderLeft}:StyledProps)=>borderLeft && `1px dotted orange`};
  border-right:${({borderRight}:StyledProps)=>borderRight && `1px dotted orange`};
  border-top:${({borderTop}:StyledProps)=>borderTop && `1px dotted orange`};
  border-bottom:${({borderBottom}:StyledProps)=>borderBottom && `1px dotted orange`};

z-index:1;
`;

export default Border;
