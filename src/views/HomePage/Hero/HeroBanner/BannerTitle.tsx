import styled from "styled-components";

interface StyledProps {
    fontSize?: string
    textAlign?: string
    position?: string
    marginLeft?: string
}




const BannerTitle = styled.h1<StyledProps>`


font-style: normal;
font-size:80px;
text-align:${({ textAlign }: StyledProps) => textAlign && textAlign};
position:${({ position }: StyledProps) => position && position};
margin-left:${({ marginLeft }: StyledProps) => marginLeft && marginLeft};



color: #FFFFFF;
@media (max-width:1030px){
    font-size:55px;
}
@media (max-width:992px){
    font-size:50px;
}

@media (max-width:768px){

    width:40%;
    margin:0 auto;
}
@media (max-width:600px){
  
    width:50%;
    margin:0 auto;
}
@media (max-width:480px){
 font-size:50px;   
 text-align:center;
 line-height: 65px;
 width: 300px;

}

`
export default BannerTitle;