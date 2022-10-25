import styled from "styled-components";

const Vids=styled.div`

// style={{ display:"flex", justifyContent: "center", gap: "100px", width: "100%", alignItems: "center" }}

display:flex;
justify-content:center;
gap:100px;
width:100%;
align-items:center;

@media(max-width:768px){
    display:none;
    border:1px solid red;
}


`

export default Vids;