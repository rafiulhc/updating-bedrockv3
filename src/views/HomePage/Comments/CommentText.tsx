import styled from "styled-components";

const CommentText = styled.div`
  position: relative;
  width: 100%;
  padding: 17px 40px;
  height: 80%;
  line-height: 20px;
  margin: 0 auto;
  color: #ffffff;
  font-weight: 325;
  font-size: 15px;
  line-height: 25px;
  &:before {
    content: url("/images/quoteStart.png");
    position: absolute;
    letter-spacing: 4px;
    font-size: 18px;
    color: orange;
    left: 3%;
    top: 1%;
    transform: scale(.6);

    @media (max-width:768px){
        left:-6%;
       

    }
  }
  &:after {
    content: url("/images/quoteEnd.png");
    position: absolute;
    letter-spacing: 4px;
    font-size: 18px;
    color: orange;
    top: 72%;
    left: 67%;
    transform: scale(.6);

    @media (max-width:786px){
      top:80%;

  }
    @media (max-width:540px){
      top:65%;

  }
   
  }

  @media (max-width:768px){
    height:60%;
    width:70%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  @media (max-width: 480px) {
    height: 70%;
    width:85%;
    padding: 17px 25px;

  }
`;

export default CommentText;
