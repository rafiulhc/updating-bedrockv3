import styled from 'styled-components'

const Td=styled.td`

width:25%;

&:last-child {
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:100%;
    width:100%;

}

@media (max-width:480px){
    padding: 10px 0;

}
`

export default Td