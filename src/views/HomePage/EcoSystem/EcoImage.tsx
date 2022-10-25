import styled from "styled-components";

const EcoImage = styled.div`
// position:absolute;
// height:600px;

width:100%;
display:flex;
justify-content:center;

&>img{
    object-fit:contain;
    height:100vh;
    width:90vw;
    

}
@media (max-width:768px){
    &>img{
        object-fit:cover;
        // width:90wv;
        width:100%;
    }
    height:80vh;
}

`

export default EcoImage