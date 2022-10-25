import styled from "styled-components"

interface StyledProps {
    height?: any
    bg?: any
    position?: any
    top?: any
}

const NavContainer = styled.div<StyledProps>`
    width:90%;
    position:relative;
    margin:0 auto;
    height:${({ height }: StyledProps) => height && height};
    display:flex;
    align-items:center;
    padding-left:20px;
    padding-right:20px;
    justify-content:space-between;
    background-color:${({ bg }: StyledProps) => bg && bg};
    align-items:center;


    @media(max-width:1100px){
        width:95%;
    }

    @media(max-width:992px){
        width:100%;
    }


    @media (max-width:768px){
        z-index:100;
        width:100%;
        position:${({ position }: StyledProps) => position && position};
        top:${({ top }: StyledProps) => top && top};
    }
`
export default NavContainer