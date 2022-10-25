import styled from "styled-components";
import Card from "../../../components/Card";
const TimeLineCard = styled(Card)`

height:130px;
// width:250px;
min-width:300px;


position:relative;
display:flex;
justify-content:center;
flex-direction:column;
padding:10px;
padding:0 40px;
&:not(:last-of-type){
    &:after{

        content: ".....................";
        position:absolute;
        letter-spacing: 4px;
        font-size: 18px;
        color:orange;
        // left:250px;
        left:300px;

        @media (max-width:768px){
            // left:250px;
            left:300px;
        }

        @media (max-width:520px){
            left:300px;
        }
        
    
         
    }
}

@media (max-width:480px){

    height:130px;
    width:280px;
}
`
export default TimeLineCard