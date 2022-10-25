import styled from "styled-components"

interface StyledProps {
    width?: any

}

const FooterBackground = styled.div<StyledProps>`
background-image:url(${({ width }: StyledProps) => width <= 480 ? '/images/footerMobileRect.svg' : '/images/footerRect1.svg'});
  
`

export default FooterBackground