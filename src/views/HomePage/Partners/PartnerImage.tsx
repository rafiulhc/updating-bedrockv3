import styled from "styled-components";

const PartnerImage = styled.div`

// width:120px;
width:283px;
height:50px;
cursor:pointer;

&>img{
    object-fit:scale-down;

}

@media (max-width:768px){
    height:80px;
}

`

export default PartnerImage
