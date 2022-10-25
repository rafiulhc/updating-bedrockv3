import React, { useEffect, useState } from "react";
import Li from "./Li";
import Logo from "./Logo";
import NavContainer from "./NavContainer";
import UL from "./UL";
import logoImage from "../../assets/images/Group.png";
import navRock from "../../assets/images/navrock.png";
import Price from "./Price";
import menuImage from "../../assets/images/Vector.png";
import menu from "../../assets/images/menu.png";

import Image from "next/image";
import Menu from "./Menu";
import Button from "../Button";
import useWindowSize from "../../hooks/useWindowSize";
import { useWeb3React } from "@web3-react/core";
import NoMetaMask from "../NoMetamask";
import Link from "next/link";
import { useRouter } from "next/router";

// import useMetaMask from "../../hooks/useMetaMask";
import NavRock from "./NavRock";
import ConnectBtn from "./ConnectBtn";
import useMetaMask from "../../hooks/useMetaMask";
import axios from "axios";

function Navbar() {
  const router = useRouter();

  const { connect, disconnect, isActive, account, isProvider, chainId } =
    useMetaMask();

  const { width } = useWindowSize();
  const [navMobile, setNavMobile] = useState(false);
  const [rockValue,setRockValue]=useState<any>(0)

  useEffect(() => {
    const getRockAddress = async () => {
      const res = await axios.get(
        "https://api.pancakeswap.info/api/v2/tokens/0xC3387E4285e9F80A7cFDf02B4ac6cdF2476A528A"
      );
      let rock = res.data;
      setRockValue(parseFloat(rock.data.price).toFixed(2));
    };

    getRockAddress();
  }, []);

  return (
    <>
      {isProvider && <NoMetaMask />}
      <NavContainer
        height={navMobile ? "100vh" : width < 480 ? "14vh" : "23vh"}
        top={navMobile && "0%"}
        position={navMobile && "fixed"}
        bg={navMobile && "#EC8845"}
      >
        <Logo>{navMobile ? "" : <Image alt="Logo" src={logoImage} />}</Logo>
        <UL display={navMobile ? "flex" : "none"}>
          <Li color={router.pathname == "/" && "active"}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Li>
          <Li color={router.pathname == "/swap" && "active"}>
            <Link href="/swap">
              <a>Swap</a>
            </Link>
          </Li>
          <Li color={router.pathname == "/earnbitcoin" && "active"}>
            <Link href="/earnbitcoin">
              <a>Earn Bitcon</a>
            </Link>
          </Li>
          <Li color={router.pathname == "/projects" && "active"}>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </Li>
          <Li color={router.pathname == "/staking" && "active"}>
            <Link href="/staking">
              <a>Stake Rock</a>
            </Link>
          </Li>
          <Li color={router.pathname == "/resources" && "active"}>
            <Link href="/resources">
              <a>Resources</a>
            </Link>
          </Li>
        </UL>
        <Menu onClick={() => setNavMobile(!navMobile)}>
          <Image alt="Menu Icon" src={navMobile ? menuImage : menu} />
        </Menu>

        {width > 783 && (
          <Price>
            <NavRock>
              <Image alt="Rock" width="100%" height="100%" src={navRock} />
            </NavRock>
            ${rockValue}
          </Price>
        )}

        {width > 783 ? (
          account ? (
            <ConnectBtn
              left={width > 768 ? "95%" : "50%"}
              background="#EC8845"
              onClick={disconnect}
            >
              Disconnect
            </ConnectBtn>
          ) : (
            <ConnectBtn background="#EC8845" onClick={connect}>
              Connect Wallet
            </ConnectBtn>
          )
        ) : (
          ""
        )}
      </NavContainer>
    </>
  );
}

export default Navbar;
