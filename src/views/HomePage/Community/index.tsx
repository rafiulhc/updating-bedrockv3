import React from 'react'
import CommunityText from './CommunityText'
import TwitterTimeline from './TwitterTimeline'
import SectionHeading from '../../../components/SectionHeading'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import CommunityHeader from './CommunityHeader'
import Paragraph from '../../../components/Paragraph'
import useWindowSize from "../../../hooks/useWindowSize";
function Community() {
  const { width } = useWindowSize();
  return (
    <>
      <CommunityHeader>
        <CommunityText>
          <SectionHeading fontSize={width <= 480 ? "30px" : "45px"} marginBottom="30px">Join Our Community</SectionHeading>
          <Paragraph fontSize="18px" opacity="0.6" >Sed ut perspiciatis unde omnis iste natus error sit volup tatem accus
            antium doloremque laud antium, totam rem a periam.
            <br />
            <br /> Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit,</Paragraph>
        </CommunityText>
        <TwitterTimeline>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="Bedrockswap"
            linkColor="rgba(109, 59, 76, 1)"
            noScrollbar
            noFooter
            theme="dark"
          />
        </TwitterTimeline>
      </CommunityHeader>
    </>
  )
}

export default Community