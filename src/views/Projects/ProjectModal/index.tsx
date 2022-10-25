
import Image from "next/image";
import React, { useRef, useState } from "react";
import Button from "../../../components/Button";
import SectionHeading from "../../../components/SectionHeading";
import ProjectModalWrap from "./ProjectModalWrap";
import cross from "../../../assets/images/cross.png";
import InfoContainer from "./InfoContainer";
import InfoDropdown from "./InfoDropdown";
import arrowdownmodal from "../../../assets/images/arrowdownmodal.png";
import InfoBox from "./InfoBox";
import InfoInput from "./InfoInput";
import InfoText from "./InfoText";
import ValidField from "./ValidField";
import useMetaMask from "../../../hooks/useMetaMask";
import Modal from "react-bootstrap/Modal";
import SubmitProject from "./SubmitProject";
import ProjectModalHeader from "./ProjectModalHeader";
import InfoWrap from "./InfoWrap";
import axios from 'axios'
function ProjectModal(props) {
  const hiddenFileInput = React.useRef(null);

  const [showPersonal, setShowPersonal] = useState(true);
  const [showBusiness, setShowBusiness] = useState(true);
  const [validateForm, setValidateForm] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    address: "",
    country:"",
    photoidfront: "",
    photoidback: "",
    businessname: "",
    metamaskaddress: "",
    projecttitle: "",
    term: "",
    interestrate: "",
    websitelink: "",
    youtubelink: "",
    logo: "",
    description: "",
    raisegoal: "",
  });

  const [startProject, setStartProject] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    address: "",
    country:"",
    photoidfront: "",
    photoidback: "",
    businessname: "",
    metamaskaddress: "",
    projecttitle: "",
    term: "",
    interestrate: "",
    websitelink: "",
    youtubelink: "",
    logo: "",
    description: "",
    raisegoal: "",
  });

  const Validate = () => {
    
    Object.keys(startProject).forEach(function (key) {
      var val = startProject[key];
      if (val === "") {
        setValidateForm((prevState) => ({
          ...prevState,
          [key]: "required",
        }));
      }
    });
  };

  const shows = async() => {
   


const res = await fetch("/api/postProject", {
  method: "POST",
  body: JSON.stringify({startProject}),
  headers: {
    "Content-Type": "application/json",
  },
});

if (res.status === 201) {
  const data = await res.json();
  
}

  }
  const validateChange = (name, value) => {
    if (name === "raisegoal") {
      if (value < 0) {
        // setValidateForm(validateForm.r)
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    // let changeVal = validateChange(name, value);

    setStartProject((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <>
      <ProjectModalWrap {...props}>
        <ProjectModalHeader
          closeButton
          closeVariant="white"
        >
          <SectionHeading margin="0 auto">Start a Project</SectionHeading>
        </ProjectModalHeader>

        <InfoContainer>
          <InfoDropdown>
            Personal Information
            <Button
              width="80px"
              position="static"
              onClick={() => setShowPersonal(!showPersonal)}
            >
              <Image src={arrowdownmodal} />
            </Button>
          </InfoDropdown>
          {showPersonal && (
            <InfoBox>
            <InfoWrap>
            <InfoInput
                name="firstname"
                type="text"
                placeholder="First name"
                onChange={handleChange}
              />
              <ValidField>{validateForm.firstname}</ValidField>
              <InfoInput
                name="lastname"
                type="text"
                placeholder="Last name"
                onChange={handleChange}
              />
              <ValidField>{validateForm.lastname}</ValidField>
            </InfoWrap>

            <InfoWrap>
            <InfoInput
                name="phoneno"
                type="text"
                placeholder="Phone"
                onChange={handleChange}
              />
              <ValidField>{validateForm.lastname}</ValidField>

              <InfoInput
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleChange}
              />
              <ValidField>{validateForm.email}</ValidField>
            </InfoWrap>
             <InfoWrap>
             <InfoInput
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleChange}
              />
              <ValidField>{validateForm.address}</ValidField>
              <InfoInput
                name="country"
                type="text"
                placeholder="Country"
                onChange={handleChange}
              />
              <ValidField>{validateForm.country}</ValidField>
             </InfoWrap>

              <InfoInput
                name="photoidfront"
                type="file"
                placeholder="Photo ID Front"
                onChange={handleChange}
              />

              

              <InfoInput
                name="photoidback"
                type="file"
                placeholder="Photo ID Back"
                onChange={handleChange}
              />
            </InfoBox>
          )}
        </InfoContainer>
        <InfoContainer>
          <InfoDropdown>
            Business Information
            <Button
              width="80px"
              position="static"
              onClick={() => setShowBusiness(!showBusiness)}
            >
              <Image src={arrowdownmodal} />
            </Button>
          </InfoDropdown>
          {showBusiness && (
            <InfoBox>
              <InfoInput
                name="metamaskaddress"
                type="text"
                onChange={handleChange}
              />

              <InfoInput
                name="businessname"
                type="text"
                placeholder="Business name"
                onChange={handleChange}
              />
              <InfoWrap>
              <InfoInput
                name="projecttitle"
                type="text"
                placeholder="Project Title"
                onChange={handleChange}
              />

              <InfoInput
                name="raisegoal"
                type="text"
                placeholder="Raise goal (BUSD)"
                onChange={handleChange}
              />
              </InfoWrap>

            <InfoWrap>
            <InfoInput
                name="term"
                type="text"
                placeholder="Term Length"
                onChange={handleChange}
              />
                            

              <InfoInput
                type="interestrate"
                placeholder="Interest Rate"
                onChange={handleChange}
              />
            </InfoWrap>
             <InfoWrap>
             <InfoInput
                type="websitelink"
                placeholder="Website Link"
                onChange={handleChange}
              />
              <InfoInput
                name="logo"
                // width="100%"
                type="file"
                placeholder="Upload image"
                onChange={handleChange}
              />
             </InfoWrap>
              <InfoInput
                name="youtubelink"
                width="100%"
                type="text"
                placeholder="Youtube video url"
                onChange={handleChange}
              />
              
              <InfoText
                name="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </InfoBox>
          )}
        </InfoContainer>

        <SubmitProject
          onClick={shows}
          left="50%"
          background=" #EC8845"
        >
          Submit
        </SubmitProject>
      </ProjectModalWrap>
    </>
  );
}

export default ProjectModal;
