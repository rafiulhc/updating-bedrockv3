import styled from 'styled-components'

const Table = styled.table`
width:100%;
border:1px solid transparent;
height:100%;

@media (max-width:768px){
  // margin-left:5px;
    border-collapse: separate;
  border-spacing: 50px 0;
}

`

export default Table