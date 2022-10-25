import styled from "styled-components"

interface StyledProps {
    position?: any
    top?: any
    left?: any
    margin?: any
    width?: any
    textAlign?: any
    fontWeight?: any
    opacity?: any
    fontSize?: any
    marginTop?: any
    marginbottom?: any
    lineheight?: any
    letterspacing?: any
}

const Paragraph = styled.p<StyledProps>`
    color:#FFFFFF;
    text-align:${({ textAlign }: StyledProps) => textAlign && textAlign};
    opacity:${({ opacity }: StyledProps) => opacity ? opacity : "1"};
    font-weight: ${({ fontWeight }: StyledProps) => fontWeight ? fontWeight : 325};
    margin:0;
    padding:0;
    position:${({ position }: StyledProps) => position && position};
    left:${({ left }: StyledProps) => left && left};
    top:${({ top }: StyledProps) => top && top};
    font-size:${({ fontSize }: StyledProps) => fontSize ? fontSize : "15px"};
    margin-top:${({ marginTop }: StyledProps) => marginTop ? marginTop : "0px"};
    line-height:${({ lineheight }: StyledProps) => lineheight && lineheight};
    letter-spacing:${({ letterspacing }: StyledProps) => letterspacing && letterspacing};

    @media (max-width:1300px){
        line-height:${({ lineheight }: StyledProps) => lineheight ? lineheight : "17px"};
        width:${({ width }: StyledProps) => width && width};
        margin:${({ margin }: StyledProps) => margin && margin};
    }

    @media (max-width:768px){
        margin-bottom:${({ marginbottom }: StyledProps) => marginbottom ? marginbottom : "0px"};
    }
    
    @media (max-width:480px){
        line-height:22px;
    }
`

export default Paragraph