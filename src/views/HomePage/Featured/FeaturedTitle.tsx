import React from 'react'
import styled from 'styled-components'

const FeaturedTitle = styled.div`
position:absolute;
margin-left:2%;
font-weight:500;
line-height: 67px;
top:-5%;
color:white;
font-size:35px;
@media (max-width:768px){
    left:50%;
    margin-left:0;
    transform:translateX(-50%);
    text-align:center;
    font-size:30px;
    line-height: 40px;
}
@media (max-width:480px){
    width: 262px;
}

`
export default FeaturedTitle