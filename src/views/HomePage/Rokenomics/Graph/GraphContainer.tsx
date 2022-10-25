import styled from "styled-components"
import Card from "../../../../components/Card"
const GraphContainer = styled(Card)`


width:40%;
display:flex;
justify-content:center;
align-items:center;
margin-top:110px;
color:#FFFFFF;


@media (max-width:768px){
    width:90%;
    margin:0 auto;
    margin-top:80px;
    height:100vh;
    padding-top:50px;
    padding-bottom:50px;
}
@media (max-width:480px){
    width:90%;
    margin:0 auto;
    margin-top:80px;
    height:55vh;
    padding-top:30px;
    padding-bottom:30px;
}

`
export default GraphContainer