import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan,faXmark} from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import MetaMaskPopup from './MetamaskPopup'

import useMetaMask from '../../hooks/useMetaMask'
function NoMetaMask() {

  const { setIsProvider} = useMetaMask()

  return (

    <>

    <MetaMaskPopup >
    <FontAwesomeIcon style={{left:"90%",top:"5%",position:"absolute"}}  icon={faXmark} onClick={()=>setIsProvider(false)}/>

    MetaMask is not installed 
    <FontAwesomeIcon  icon={faBan} />
    </MetaMaskPopup>
    </>
  )
}

export default NoMetaMask