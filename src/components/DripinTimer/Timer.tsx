import styled from "styled-components";

interface StyledProps{
    marginTop?:any
}


const Timer = styled.div`

width:60%;
height:50vh;
background-image:url("/images/layers.png"),linear-gradient(134.27deg, #E98331 5.56%, #EC8845 59.48%, #893242 93.01%);
background-repeat:no-repeat;
background-size:cover;
filter:blur;
border-radius:6px;
display:flex;
justify-content:center;
flex-direction:column;
text-align:center;
align-items:center;
position:relative;
padding:10px 0;
@media (max-width:1400px){
    
    width:80%;
    
}
@media (max-width:1280px){
    
    width:65%;
    height:50vh;
    
}
@media (max-width:1100px){
    
    width:70%;
    height:50vh;
    
}

@media (max-width:990px){
    
    width:70%;
   
}
@media (max-width:768px){
    height:48vh;
    width:90%;
    // margin-top:80px;
}
@media (max-width:480px){
    height:30vh;
    width:90%;
    
}

`

export default Timer