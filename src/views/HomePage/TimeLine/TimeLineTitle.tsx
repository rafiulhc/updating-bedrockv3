import React from 'react'
import styled from 'styled-components'

const TimeLineTitle = styled.div`
position:absolute;
margin-left:9%;
top:22%;
color:white;
font-size:35px;
font-weight:500;


@media (max-width:768px){
    left:50%;
    margin-left:0;
    transform:translateX(-50%);
}
@media (max-width:540px){
    // font-size:30px;
    top:13%;
    width: 280px;
   

}
@media (max-width:480px){
    font-size:30px;
    top:13%;
    width: 250px;
   

}




`
export default TimeLineTitle