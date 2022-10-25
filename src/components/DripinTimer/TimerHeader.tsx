import styled from 'styled-components'
const TimerHeader = styled.div`

height:60vh;
width:100%;
display:flex;
justify-content:center;
align-items:center;
position:relative;

@media (max-width:768px){

    height:50vh;
    margin:20px 0;
    
}
@media (max-width:480px){

    height:30vh;
    // margin-top:220px;
    
}
@media (max-width:390px){

    height:30vh;
    // margin-top:180px;
    
}
@media (max-width:380px){

    height:30vh;
    // margin-top:90px;
    
}

`

export default TimerHeader