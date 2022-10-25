import styled from "styled-components";

const CommunityText = styled.div`
position:relative;
width:30%;
height:60%;
color:#FFFFFF;
font-weight: 325;
font-size: 15px;
line-height: 32px;
flex-direction:column;


@media (max-width:768px){
    
    width:80%;
    height:40%;
    margin:0 auto;
    margin-bottom:0;
    text-align:center;
}
@media (max-width:480px){
    
    width:80%;
    height:60%;
    margin:0 auto;
    margin-bottom:0;
    text-align:center;
}

`

export default CommunityText
