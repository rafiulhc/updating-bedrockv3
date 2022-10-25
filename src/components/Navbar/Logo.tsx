import styled from "styled-components";

const Logo = styled.div`
  width: 200px;
  height: 100%;

  display: flex;
  justify-content: center;

  align-items: center;


  @media (max-width: 768px) {
 
    top: 60px;
    height: auto;
    left:4%;
  }

  @media(max-width:1280px){
    width:150px;
  }
`;
export default Logo;
