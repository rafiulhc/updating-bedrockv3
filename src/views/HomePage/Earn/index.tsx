import React from 'react'
import Paragraph from '../../../components/Paragraph'
import Title from '../../../components/Title'
import EarnText from './EarnText'
import Main from './Main'
import VideoContainer from './VideoContainer'
import Iframe from '../../../components/Iframe'
import useWindowSize from '../../../hooks/useWindowSize'
import EarnTitle from './EarnTitle'

function Earn() {

  const { width } = useWindowSize();
  return (
    <>
      <Main >
        <EarnText>
          <EarnTitle textAlign={width <= 480 ? "left" : "left"} fontSize={width > 786 ? "50px" : "30px"}>
            Earn Bitcoin <br /> by Staking Rock
          </EarnTitle>
          <Paragraph opacity="0.75" fontSize="15px" marginTop="30px" marginbottom="60px" lineheight="22px" >
            Sed ut perspiciatis unde omnis iste {width < 480 && <br />} natus error sit volup
            {width > 480 && <br />}
            tatem accus  {width < 480 && <br />} antium doloremque laud antium,  {width < 480 && <br />}totam rem a periam.
            <br />
            <br />

            Neque porro quisquam est, qui  {width < 480 && <br />} dolorem ipsum quia dolor   {width > 480 && <br />} sit amet,  {width < 480 && <br />} consectetur, adipisci velit,

          </Paragraph>
        </EarnText>
        <VideoContainer width={width <= 768 ? "100%" : "50%"} >
          <Iframe src='https://www.youtube.com/embed/FsON37LULqc' />

        </VideoContainer>

      </Main>
    </>
  )
}

export default Earn