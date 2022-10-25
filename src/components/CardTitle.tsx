import styled from 'styled-components'

interface StyledProps {

    fontSize?: any
}

const CardTitle = styled.h5`
font-size: ${({ fontSize }: StyledProps) => fontSize ? fontSize : "18px"};

color:#FFFFFF;
margin:3px 0;
line-height: 25px;
letter-spacing: -0.02em;
`

export default CardTitle