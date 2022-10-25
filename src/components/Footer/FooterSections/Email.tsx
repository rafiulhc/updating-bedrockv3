import styled from 'styled-components'

const Email = styled.div`
width:100%;
height:80px;
position:relative;
display:flex;
align-items:center;
justify-content:flex-end;


input{
    border:none;
    outline:none;
    border-radius:12px;
    border:1px solid #FFFFFF;
    background-color:transparent;
    color:#FFFFFF;
    padding:20px 20px;
    width:100%;
    font-size:12px;

    &::placeholder{
        color:#FFFFFF;
        opacity: 1; 
        font-size:12px;
    }

    @media(max-width:1100px){
        padding:20px 5px;
    }
}
    
}

@media (max-width:768px){
    height:auto;
    input{
        height:10px;
        margin:10px 0;
    }
}
`
export default Email