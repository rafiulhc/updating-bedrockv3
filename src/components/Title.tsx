import styled from "styled-components"

interface StyledProps {
    fontSize?: any
    textAlign?: any
    position?: any
    marginLeft?: any
    zIndex?: any
    fontWeight?: any
    marginBottom?: any
}

const Title = styled.h1<StyledProps>`
// font-family: 'Gotham',sans-serif;
    font-weight:${({ fontWeight }: StyledProps) => fontWeight && fontWeight}
    font-style: normal;
    font-size:${({ fontSize }: StyledProps) => fontSize ? fontSize : "70px"};
    text-align:${({ textAlign }: StyledProps) => textAlign && textAlign};
    position:${({ position }: StyledProps) => position && position};
    margin-left:${({ marginLeft }: StyledProps) => marginLeft && marginLeft};
  
    color: #FFFFFF;
    z-index:${({ zIndex }: StyledProps) => zIndex && zIndex};

    @media (max-width:1030px){
        font-size:${({ fontSize }: StyledProps) => fontSize ? fontSize : "70px"};
    }

    @media (max-width:480px){
    font-size:${({ fontSize }: StyledProps) => fontSize ? fontSize : "40px"};
    text-align:${({ textAlign }: StyledProps) => textAlign && textAlign};
    }
`
export default Title