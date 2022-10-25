import styled from "styled-components";

const Comment = styled.div`

min-width:390px;

height:80%;
margin-top:100px;
border:1px solid #E98331;
border-radius: 16px;


@media (max-width:768px){
width:70%;
height:50vh;



@media (max-width:540px){
    width:100%;
    height:80%; 
    margin-bottom:0;

    }
@media (max-width:480px){
    width:100%;
    height:80%; 
    margin-bottom:0;

    }
    @media (max-width:414px){
        width:100%;
        height:70%; 
        margin-bottom:0;
    
        }
        @media (max-width:400px){
            width:100%;
            min-width:0;

            height:80%; 
            margin-bottom:0;
        
            }

    @media (max-width:375px){
        margin-bottom:0;
        min-width:0;

        }
border-radius: 16px;


`

export default Comment