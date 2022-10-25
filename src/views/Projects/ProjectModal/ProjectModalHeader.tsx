import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const ProjectModalHeader=styled(Modal.Header)`



// button{
//     .hey{
//         color:red;
//     }
// }


& > button {
    .btn-close-white{
        color:red;
    }
    // color:red;
}
`

export default ProjectModalHeader