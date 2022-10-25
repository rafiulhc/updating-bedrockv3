import styled from "styled-components";

interface StyledProps {
    width?: string
    height?: string

}


const VideoContainer = styled.div<StyledProps>`

width:${props => props.width ? props.width : "40%"};
height:${props => props.height ? props.height : "auto"};

@media (max-width:768px){
    

    // width:${props => props.width ? props.width : "350px"}px;
    width:90%;
    height: 21vh;
   margin:0 auto;
   padding:0 10px;



}

`
export default VideoContainer