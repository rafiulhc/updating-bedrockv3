import styled from "styled-components"

interface StyledProps {
    position?: any
    top?: any
    left?: any
    marginLeft?: any
    marginRight?: any
    marginBottom?: any
    marginTop?: any
    textAlign?: any
    fontSize?: any
    margin?:any
    width?:any
}

const SectionHeading = styled.h2<StyledProps>`
    position:${({ position }: StyledProps) => position && position};
    top:${({ top }: StyledProps) => top && top};
    left:${({ left }: StyledProps) => left && left};
    transform:translateX(-${({ left }: StyledProps) => left && left});
    margin-left:${({ marginLeft }: StyledProps) => marginLeft && marginLeft};
    margin-right:${({ marginRight }: StyledProps) => marginRight && marginRight};
    font-size: ${({ fontSize }: StyledProps) => fontSize ? fontSize : "28px"};

    margin-bottom:${({ marginBottom }: StyledProps) => marginBottom && marginBottom};
    margin:${({ margin }: StyledProps) => margin && margin};
    width:${({ width }: StyledProps) => width && width};
    color:#FFFFFF;
    font-weight: 600;
    margin-top:${({ marginTop }: StyledProps) => marginTop && marginTop};
    text-align:${({ textAlign }: StyledProps) => textAlign && textAlign};
`

export default SectionHeading