import styled from "styled-components";

interface StyledProps{
    width?:any
    height?:any
    marginTop?:any
    marginBottom?:any
    
}

const ImageWrapper = styled.div`

position:absolute;
width:${({ width }: StyledProps) => width && width};
height:${({ height }: StyledProps) => height && height};
margin-top:${({ marginTop }: StyledProps) => marginTop && marginTop};

@media(max-width:786px){
    
}



`
export default ImageWrapper;