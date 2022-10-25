import styled from "styled-components"

interface StyledProps {
    position?: any,
    fontSize?: any,
    left?: any,
    top?: any
}

const SubTitle = styled.h1<StyledProps>`
    position:${({ position }: StyledProps) => position && position};
    font-weight: 325;
    font-size: ${({ fontSize }: StyledProps) => fontSize ? fontSize : "20px"};
    left:${({ left }: StyledProps) => left && left};
    top:${({ top }: StyledProps) => top && top};
    color: #FFFFFF;
    opacity: 0.75;

    @media (max-width:1030px){
        top:50%;
    }

    @media (max-width:768px){
        position:relative;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        width:100%;
        top:16px;
        font-size: 20px;
    }

    @media (max-width:480px){
        left:50%;
        transform:translateX(-50%);
        top:40%;
        width:80%;
        z-index:2;
    }

    @media (max-width:397px){
        left:50%;
        transform:translateX(-50%);
        top:40%;
        width:80%;
        z-index:2;
    }

    @media (max-width:390px){
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        width:80%;
        top:40%;
    }

    @media (max-width:375px){
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        width:80%;
        top:50%;
    }

    @media (max-width:360px){   
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        width:80%;
        top:42%;
    }
`

export default SubTitle