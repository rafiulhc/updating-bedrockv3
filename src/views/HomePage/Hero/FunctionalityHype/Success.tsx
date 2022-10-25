import styled from "styled-components";

const Success=styled.div`
width:20%;
display:flex;
justify-content:center;
flex-direction:column;
text-align:center;
:not(:last-of-type){
    border-right:1px dashed #FFFFFF;
}


@media(max-width:768px){
    margin:0 auto;
    border-right:none;
    width:70%;
    margin-top:10px;


    :not(:last-of-type){
        border-right:none;
    }
}


@media(max-width:480px){
    margin:0 auto;
    border-right:none;
    width:70%;
    margin-top:10px;


    :not(:last-of-type){
        border-right:none;
    }
}
`
export default Success

