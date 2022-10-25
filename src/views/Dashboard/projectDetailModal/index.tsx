import React from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
//import { useTranslation } from 'contexts/Localization'
//import { Button } from '@pancakeswap/uikit'
//import axios from 'axios'
import useTheme from "../../../hooks/useTheme"
import Facebook from './utils/facebook.png'
import Github from './utils/github.png'
import LinkedIn from './utils/linkedin.png'
import Instagram from './utils/instagram.png'
import logo from './utils/logo.png'

interface StyledProps {
  isDark?: boolean
  isMobile?: boolean
}
const RegisterBox = styled.div`
  padding: 10px;
  background-color: #000;
  width: ${({ isMobile }: StyledProps) => (isMobile ? '100%' : '70%')};
  border-radius: 20px;
  position: relative;
  height: auto;
  margin-top: ${({ isMobile }: StyledProps) => (isMobile ? '100px' : '0px')};
  overflow: hidden;
`
const RegisterHeader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const RegisterHeading = styled.h1`
  font-size: 36px;
  color: #fff;
`
const RegisterDetails = styled.div`
  display: flex;
  height: calc(100% - 80px);
  flex-direction: ${({ isMobile }: StyledProps) => (isMobile ? 'column' : 'row')};
`
const RegisterationModal = styled(Modal)`
  background: transparent;
  .modal-dialog {
    width: 100%;
    background: transparent;
    min-width: 100%;
    border: none;
    margin: ${({ isMobile }: StyledProps) => (isMobile ? '0px' : '0.5rem')};
    padding: ${({ isMobile }: StyledProps) => (isMobile ? '10px' : '8px')};
  }
  .modal-content {
    background: transparent;
    border: none;
    align-items: center;
  }
  .modal-header {
    border-bottom: none;
  }
`
const RegisterBoxRight = styled.div`
  width: ${({ isMobile }: StyledProps) => (isMobile ? '100%' : '35%')};
  padding: 10px;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`
const InnerRight = styled.div`
  width: 100%;
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`
const RegisterBoxLeft = styled.div`
  width: ${({ isMobile }: StyledProps) => (isMobile ? '100%' : '65%')};
  padding: ${({ isMobile }: StyledProps) => (isMobile ? '10px' : '10px 30px;')};
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-content: space-around;
`
const RegisterBoxRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ isMobile }: StyledProps) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  margin: 5px;
`
const UserImage = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #cac7e9;
`
const BusinessVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #cac7e9;
`
const Span = styled.span`
  display: flex;
  font-size: ${({ isMobile }: StyledProps) => (isMobile ? '14px' : '16px')};
  color: #cac7e9;
  align-items: center;
  bottom: -19px;
  width: auto;
  cursor: default;
  flex-wrap: wrap;
`
const SocialIcon = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`
const SocialIconBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 5px;
`
const BusinessName = styled.p`
  color: grey;
`

const ProjectDetailModal = (props) => {
  const { isMobile } = useTheme()
 // const { t } = useTranslation()
  const { data } = props

  return (
    <RegisterationModal {...props} aria-labelledby="contained-modal-title-vcenter" centered isMobile={isMobile}>
      <RegisterBox isMobile={isMobile}>
        {data && (
          <>
            <Modal.Header closeButton closeVariant="white">
              <RegisterHeader>
                <RegisterHeading>{data.title}</RegisterHeading>
                <br />
                <BusinessName>{data?.businessname}</BusinessName>
              </RegisterHeader>
            </Modal.Header>
            <hr style={{ height: '2px', color: '#fff' }} />
            <Span style={{ fontSize: '20px', color: '#ffd1b1', paddingLeft: '30px' }}>{data.description}</Span>
            <RegisterDetails isMobile={isMobile}>
              <RegisterBoxLeft isMobile={isMobile}>
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Owner:</Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end' }} isMobile={isMobile}>
                    {' '}
                    {data.firstname} {data.lastname}
                  </Span>
                </RegisterBoxRow>
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Raise Goal: </Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end' }} isMobile={isMobile}>
                    {data.raisegoal}$
                  </Span>
                </RegisterBoxRow>
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Return Percentage: </Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end' }} isMobile={isMobile}>
                    {data.returnpercentage}%
                  </Span>
                </RegisterBoxRow>
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Term : </Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end' }} isMobile={isMobile}>
                    {data.term} months
                  </Span>
                </RegisterBoxRow>
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Address : </Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end', fontSize: '14px' }} isMobile={isMobile}>
                    {data.address}
                  </Span>
                </RegisterBoxRow>
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Address Line 1 : </Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end' }} isMobile={isMobile}>
                    {data.tempaddress}
                  </Span>
                </RegisterBoxRow>{' '}
                <RegisterBoxRow isMobile={isMobile}>
                  <Span isMobile={isMobile}>Address Line 2 : </Span>
                  <Span style={{ color: '#ffd1b1', justifyContent: 'flex-end' }} isMobile={isMobile}>
                    {data.permaddress}
                  </Span>
                </RegisterBoxRow>{' '}
                <SocialIconBox>
                  <a
                    href={data.fbhandle.startsWith('https') ? data.fbhandle : `https://facebook.com/${data.fbhandle}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialIcon src={Facebook.src} alt="Facebook" />
                  </a>
                  {data?.githandle ? (
                    <a
                      href={
                        data.githandle.startsWith('https') ? data.githandle : `https://www.github.com/${data.githandle}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SocialIcon src={Github.src} alt="Github" />
                    </a>
                  ) : (
                    data?.instahandle && (
                      <a
                        href={
                          data.instahandle.startsWith('https')
                            ? data.instahandle
                            : `https://www.instagram.com/${data.instahandle}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SocialIcon src={Instagram.src} alt="Github" />
                      </a>
                    )
                  )}
                  <a
                    href={
                      data.linkedhandle.startsWith('https')
                        ? data.linkedhandle
                        : `https://linkedin.com/in/${data.linkedhandle}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialIcon src={LinkedIn.src} alt="LinkedIn" />
                  </a>
                </SocialIconBox>
              </RegisterBoxLeft>
              <RegisterBoxRight isMobile={isMobile}>
                <InnerRight>
                  {data.informationalvideo ? (
                    <BusinessVideo src={data.informationalvideo} controls />
                  ) : data.logo ? (
                    <UserImage src={data.logo.localeCompare('image1') ? data.logo : logo} alt="baseimage" />
                  ) : (
                    <UserImage src={logo.src} alt="baseimage" />
                  )}
                </InnerRight>
              </RegisterBoxRight>
            </RegisterDetails>
          </>
        )}
      </RegisterBox>
    </RegisterationModal>
  )
}

export default ProjectDetailModal