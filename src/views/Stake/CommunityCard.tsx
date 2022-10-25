import styled from "styled-components";


interface StyledProps{
flexDirection?:string


}


const CommunityCard=styled.div<StyledProps>`
height:70%;
width:45%;
position:relative;
display:flex;
padding:30px 20px;
flex-direction:${({flexDirection}:StyledProps)=>flexDirection ? flexDirection:"column" };

@media (max-width:480px){
width:90%;
height:fit-content;

}


`

export default CommunityCard