import styled from "styled-components";

interface StyledProps{
    width?:string
    height?:string

}


const VideoContainer2 = styled.div<StyledProps>`


width:${props => props.width ? props.width : "50%"}px;
// height:${props => props.height ? props.height : "auto"};
height:80%;

@media (max-width:768px){
    width:300px;
   height:200px;

   padding:0 10px;

}

`
export default VideoContainer2