import React,{useEffect, useState} from "react";
import ViewWrapper from "./ViewWrapper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ViewModal from "./ViewModal";
import ViewDescription from "./ViewDescription";
import ViewBody from "./ViewBody";
import ViewLeft from "./ViewLeft";
import ViewRight from "./ViewRight";
import ViewProperty from "./ViewProperty";
import Funds from "../Project/Funds";
import ProjectImage from "../Project/ProjectImage";
import SocialIconBox from "./SocialIconBox";
import SocialIcon from "./SocialIcon";
import Image from 'next/image'
import bitcoin from '../../../assets/images/bitcoin.png'
import BigNumber from 'bignumber.js'
import Link from 'next/link'
import Facebook from '../../../assets/images/facebook.png'
import Instagram from '../../../assets/images/instagram.png'
import Linkedin from '../../../assets/images/linkedin.png'
import Github from '../../../assets/images/github.png'
import WebsiteLink from '../../../assets/images/web.png'




import {useBedrockProjectContract,useBusdContract} from '../../../hooks/useContract'
import FundInput from "./FundInput";
import FundBtn from "./FundBtn";
function ProjectView(props) {
     const [ventureState,setVentureState]=useState('')
     const [raiseFunds,setRaiseFunds]=useState(0)
    const {project}=props;

    const projectContract = useBedrockProjectContract(project?.contract)
    const busdContract = useBusdContract()



    useEffect(() => {
      const getVentureState = async () => {
        const depoState = await projectContract.ventureState()
        setVentureState(depoState)
        
        
      }
      getVentureState()})


    

  return (
    <>
      

      <ViewModal {...props}>
        <Modal.Header closeButton  closeVariant="white" >
        {project?.title}
        </Modal.Header>
        <ViewDescription>
            {project?.description}
        </ViewDescription>
        <ViewBody>
            <ViewLeft>
              <ViewProperty>
                <Funds>Raise</Funds>
                <Funds>{project?.raisegoal}</Funds>
              </ViewProperty>
              <ViewProperty>
                <Funds>Owner Wallet Address</Funds>
                <Funds><Link href={`https://bscscan.com/address/${project?.address}`} >{project?.address}</Link></Funds>
                

              </ViewProperty>
              <ViewProperty>
                <Funds>Contract Address</Funds>
                <Funds><Link href={`https://bscscan.com/address/${project?.contract}`} >{project?.contract}</Link></Funds>
                

              </ViewProperty>
              <ViewProperty>
                <Funds>Return Percentage</Funds>
                <Funds>{project?.returnpercentage}%</Funds>
              </ViewProperty>
              <ViewProperty>
                <Funds>Venture State</Funds>
                <Funds>{ventureState}</Funds>
              </ViewProperty>
              <ViewProperty>
              <SocialIconBox>
                  {project.fbhandle && project.fbhandle !== 'NA' && (
                    <a
                      href={project.fbhandle.startsWith('https') ? project.fbhandle : `https://facebook.com/${project.fbhandle}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image width={50} height={50} src={Facebook} alt="Facebook" />
                    </a>
                  )}
                  {project?.githandle && project?.githandle !== 'NA' ? (
                    <a
                      href={
                        project.githandle.startsWith('https') ? project.githandle : `https://www.github.com/${project.githandle}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image width={50} height={50} src={Github} alt="Github" />
                    </a>
                  ) : (
                    project?.instahandle &&
                    project?.instahandle !== 'NA' && (
                      <a
                        href={
                          project.instahandle.startsWith('https')
                            ? project.instahandle
                            : `https://www.instagram.com/${project.instahandle}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image width={50} height={50} src={Instagram} alt="Instagram" />
                      </a>
                    )
                  )}
                  {project.linkedhandle && project.linkedhandle !== 'NA' && (
                    <a
                      href={
                        project.linkedhandle.startsWith('https')
                          ? project.linkedhandle
                          : `https://linkedin.com/in/${project.linkedhandle}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image width={50} height={50} src={Linkedin} alt="LinkedIn" />
                    </a>
                  )}
                  {project.websitelink && project.websitelink !== 'NA' && project?.websitelink?.startsWith('http') && (
                    <a href={project.websitelink} target="_blank" rel="noreferrer">
                      <Image width={50} height={50} src={WebsiteLink} alt="LinkedIn" />
                    </a>
                  )}
                </SocialIconBox>
              </ViewProperty>

            </ViewLeft>
            <ViewRight>
            <ProjectImage>
          <Image width={260} height={230} src={project?.logo?.startsWith('project:image') ? project?.logo : bitcoin} />
        </ProjectImage>
            </ViewRight>
        </ViewBody>

      </ViewModal>
    </>
  );
}

export default ProjectView;