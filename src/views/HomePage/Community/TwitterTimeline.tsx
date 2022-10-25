import styled from "styled-components";

const TwitterTimeline = styled.div`

position:relative;
z-index:2;
width:40%;
height:90%;
background: #000216;
box-shadow: 0px 4px 50px rgba(136, 69, 83, 0.25), inset 0px 4px 50px rgba(236, 136, 69, 0.25), inset 0px 4px 50px rgba(209, 115, 93, 0.25);
border-radius: 16px;
padding:15px;
border: 1px solid;
overflow-Y:auto;

border-image-source: linear-gradient(180deg, #EC8845 0%, #D1735D 27.4%, #884553 59.69%, #873242 100%);

&::-webkit-scrollbar {
   background:transparent;
   width:10px;
};
&::-webkit-scrollbar-thumb {
       background: #E98331;

       height:120px;
       width:10px;
       border-radius: 60px;

       
    };
    @media (max-width:768px){

      width:80%;
      height:50%;
      margin:0 auto;
      margin-bottom:0;
    }
    @media (max-width:480px){
      height:50%;
      width:90%;
      // margin-bottom: 80px;
    }
   
`

export default TwitterTimeline
