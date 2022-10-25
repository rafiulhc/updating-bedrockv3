import styled from "styled-components"

interface StyledProps{
    marginLeft?:any
    marginRight?:any
}

const Number = styled.div`


margin-left:${({marginLeft}:StyledProps)=>marginLeft && marginLeft};
margin-right:${({marginRight}:StyledProps)=>marginRight && marginRight};


width:80px;
height:90px;
color:#FFFFFF;
background: rgba(0, 0, 0, 0.5);
border: 1px solid rgba(255, 255, 255, 0.1);
display:flex;
justify-content:center;
align-items:center;
border-radius: 6px;
// margin:0 5px;

font-size: 48px;
@media (max-width:1280px){
width:60px;
height:80px;
}
@media (max-width:1100px){
    width:50px;
    height:60px;
    }
    
    @media (max-width:990px){
        width:45px;
        height:60px;
        }
        





@media (max-width:768px){
    width:45px;
    height:55px;
    margin-left:0;
    margin-right:0;
    margin:0 5px;

}
@media (max-width:480px){
    width:32px;
    height:100%;
    margin:0 3px;
   
    font-size: 30px;
   
}
`

export default Number