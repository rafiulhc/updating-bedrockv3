// import styled from "styled-components";

// const ProjectModalWrap=styled.div`

// width:70%;
// height:100vh;
// margin:0 auto;
// position:relative;
// overflow-y:auto;

// z-index:4;

// padding:30px 0;
// background: #000216;
// box-shadow: 0px 4px 50px rgba(136, 69, 83, 0.25), inset 0px 4px 50px rgba(236, 136, 69, 0.25), inset 0px 4px 50px rgba(209, 115, 93, 0.25);

// border-radius: 16px;

// &::-webkit-scrollbar {
//     background:transparent;
//     width:10px;
//  };
//  &::-webkit-scrollbar-thumb {
//         background: #E98331;
 
//         height:120px;
//         width:10px;
//         border-radius: 60px;
 
        
//      };

// `

// export default ProjectModalWrap


import styled from "styled-components";
import { Modal } from 'react-bootstrap'
const ProjectModalWrap = styled(Modal)`


.modal-dialog {
    min-width: 100%;
    background:transparent;
}
.modal-content {
    padding:10px 20px;



  background: #000216;
  box-shadow: 0px 4px 50px rgba(136, 69, 83, 0.25), inset 0px 4px 50px rgba(236, 136, 69, 0.25), inset 0px 4px 50px rgba(209, 115, 93, 0.25);

  color:white;
  height:20%;
  width:70%;
  margin: 0 auto;
}
.modal-header {
  border-bottom: none;
}
`

export default ProjectModalWrap