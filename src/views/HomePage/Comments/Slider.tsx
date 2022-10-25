import styled from "styled-components";

const Slider=styled.div`
width:80%;
display:flex;
justify-content:center;
margin:0 auto;
left:50%;
transform:translateX(-50%);
position:absolute;
top:100%;

@media(max-width:540px){
    top:100%;
}
@media(max-width:480px){
    top:105%;
}
@media(max-width:400px){
    top:100%;
}
`

export default Slider;