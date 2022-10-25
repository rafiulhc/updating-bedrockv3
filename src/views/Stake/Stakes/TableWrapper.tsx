import styled from "styled-components";

const TableWrapper=styled.div`

width:80%;
height:50%;
margin:0 auto;
@media (max-width:480px){
    overflow-x:auto;

    &::-webkit-scrollbar {
        background:transparent;
        width:5px;
     };
     &::-webkit-scrollbar-thumb {
            background: #E98331;
     
            height:100px;
            width:5px;
            border-radius: 60px;
     
            
         };
    
}
`
export default TableWrapper