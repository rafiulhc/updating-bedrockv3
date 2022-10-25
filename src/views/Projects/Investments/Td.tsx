import styled from 'styled-components'

const Td = styled.td`

width:25%;
padding:10px 0;
font-size: 18px;

&:last-child {
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    width:25%;
    height:100%;
    width:100%;

}

@media (max-width:480px){
    padding: 10px 0;

}
`

export default Td