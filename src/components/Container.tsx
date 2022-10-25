import styled from "styled-components"

interface StyledProps {
    width?: any
    height?: any
    left?: any
    top?: any
}

const Container = styled.div<StyledProps>`
    position: absolute;
    width:${({ width }: StyledProps) => width ? width : 0}
    height:${({ height }: StyledProps) => height ? height : 0}

    left:${({ left }: StyledProps) => left ? left : "auto"}
    top:${({ top }: StyledProps) => top ? top : "auto"}
`

export default Container