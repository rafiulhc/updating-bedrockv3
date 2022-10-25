import styled from "styled-components";
interface StyledProps {

    marginTop?: any

}

const Funding = styled.div <StyledProps>`
width:100%;
min-height:102vh;
text-align:center;
position:relative;
margin-top:${({ marginTop }: StyledProps) => marginTop && marginTop};
padding-left:70px;
padding-right:70px;
@media (max-width:1100px){
    padding-left:10px;
padding-right:10px;
}

`

export default Funding