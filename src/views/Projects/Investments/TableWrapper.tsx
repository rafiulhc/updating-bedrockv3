import styled from "styled-components";

const TableWrapper = styled.div`

width:80%;
// height:50%;
// border:1px solid red;
margin:0 auto;
// z-index:1

@media (max-width:768px){
    width:100%;
    overflow-x:auto;

    &::-webkit-scrollbar {
        background:transparent;
        width:5px;
     };
   



    &::-webkit-scrollbar-thumb {
        background: #E98331;
 
        height:100px;
        width:2px;
        border-radius: 60px;
 
        
     };
    
}
`
export default TableWrapper