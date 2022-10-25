import styled from "styled-components";
import {Modal} from "react-bootstrap"


const InvestModal=styled(Modal)`
.modal-dialog {
    min-width: 100%;
    background:transparent;
}
.modal-content {
    padding:10px 20px;



  background: #000216;
  box-shadow: 0px 4px 50px rgba(136, 69, 83, 0.25), inset 0px 4px 50px rgba(236, 136, 69, 0.25), inset 0px 4px 50px rgba(209, 115, 93, 0.25);

  color:white;
  height:30vh;
  width:70%;
  margin: 0 auto;
}
.modal-header {
  border-bottom: none;
}
`

export default InvestModal