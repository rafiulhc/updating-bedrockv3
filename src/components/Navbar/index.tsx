import React, { useEffect, useState } from 'react'
import Li from './Li'
import Logo from './Logo'
import NavContainer from './NavContainer'
import UL from './UL'
import logoImage from '../../assets/images/Group.png'
import navRock from '../../assets/images/navrock.png'
import Price from './Price'
import menuImage from '../../assets/images/Vector.png'
import menu from '../../assets/images/menu.png'

import Image from 'next/image'
import Menu from './Menu'
import useWindowSize from '../../hooks/useWindowSize'
import NoMetaMask from '../NoMetamask'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavRock from './NavRock'
import ConnectBtn from './ConnectBtn'
import useMetaMask from '../../hooks/useMetaMask'
import axios from 'axios'
import ResourceDropDown from '../ResourseDropDown'
import EarnDropDown from './EarnDropDown'

function Navbar() {
  const router = useRouter()

  const { connect, disconnect, account, isProvider } = useMetaMask()

  const { width } = useWindowSize()
  const [navMobile, setNavMobile] = useState(false)
  const [rockValue, setRockValue] = useState<any>(0)

  const [showDropDown, setShowDropDown] = useState(false)
  const [showDropDownEarn, setShowDropDownEarn] = useState(false)

  const  isMobileDevice = () => {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

  useEffect(() => {
    const getRockAddress = async () => {
      try {
        const res = await axios.get(
          'https://api.pancakeswap.info/api/v2/tokens/0xC3387E4285e9F80A7cFDf02B4ac6cdF2476A528A'
        )
        let rock = res.data
        setRockValue(parseFloat(rock.data.price).toFixed(4))
      } catch (error) {
        console.log(error)
      }
    }

    getRockAddress()
  }, [])

  return (
    <>
      {isProvider && <NoMetaMask />}
      <NavContainer
        height={navMobile ? '100vh' : width < 480 ? '14vh' : '23vh'}
        top={navMobile && '0%'}
        position={navMobile && 'fixed'}
        bg={navMobile && '#EC8845'}>
        <Logo>{navMobile ? '' : <Image alt='Logo' src={logoImage} />}</Logo>
        <UL display={navMobile ? 'flex' : 'none'}>
          {
            navMobile && <Li>
            <ConnectBtn
        onClick={() => {
                      if (isMobileDevice()) {
                      window.open("https://metamask.app.link/dapp/latest-bedrock.vercel.app/");
                       } else {
                        window.open("https://metamask.io/", "_blank");
                      }
                    }}
                  >
                  Open Wallet Browser
        </ConnectBtn>
          </Li>
          }
          <Li color={router.pathname == '/' ? '#E98331' : '#FFFFFF'}>
            <Link href='/'>
              <a style={{cursor:"pointer"}}>Home</a>
            </Link>
          </Li>
          <Li color={router.pathname == '/swap' ? '#E98331' : '#FFFFFF'}>
            <Link href='/swap'>
              <a>Swap</a>
            </Link>
          </Li>
          <Li
            style={{ width: showDropDown && '70px', cursor: 'pointer' }}
            onClick={() => setShowDropDownEarn(!showDropDownEarn)}>
            Earn
            {showDropDownEarn && <EarnDropDown />}
          </Li>

          {/*<Li color={router.pathname == '/projects' ? '#E98331' : '#FFFFFF'}>
            <Link href='/projects'>
              <a>Projects</a>
            </Link>
          </Li>*/}

          {router.pathname == '/dashboard' && (
            <Li color={router.pathname == '/dashboard' ? '#E98331' : '#FFFFFF'}>
              <Link href='/dashboard'>
                <a>Dashboard</a>
              </Link>
            </Li>
          )}
          <Li
            style={{ width: showDropDown && '70px', cursor: 'pointer' }}
            onClick={() => setShowDropDown(!showDropDown)}>
            Resources
            {showDropDown && <ResourceDropDown />}
          </Li>
        </UL>
        <Menu onClick={() => setNavMobile(!navMobile)}>
          <Image alt='Menu Icon' src={navMobile ? menuImage : menu} />
        </Menu>

        {width > 783 && (
          <Price>
            <NavRock>
              <Image alt='Rock' width='100%' height='100%' src={navRock} />
            </NavRock>
            ${rockValue}
          </Price>
        )}

        {width > 783 ? (
          account ? (
            <ConnectBtn
              left={width > 768 ? '95%' : '50%'}
              background='#EC8845'
              onClick={disconnect}>
              Disconnect
            </ConnectBtn>
          ) : (
            <ConnectBtn background='#EC8845' onClick={connect}>
              Connect Wallet
            </ConnectBtn>
          )
        ) : (
          ''
        )}
      </NavContainer>
    </>
  )
}

export default Navbar
