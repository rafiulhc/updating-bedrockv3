import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Web3ReactProvider } from '@web3-react/core'

import { Web3Provider } from "@ethersproject/providers";

import { MetaMaskProvider } from '../src/hooks/useMetaMask'
import useMetaMask from '../src/hooks/useMetaMask'
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'

import AOS from 'aos';
import 'aos/dist/aos.css';
// AOS.init();
// import { injected } from '../src/components/wallet/connectors'


function MyApp({ Component, pageProps }) {

useEffect(()=>{
  AOS.init({duration:500});

},[])

// useEffect(()=>{

//   const getAddr=async()=>{
//     const address=localStorage.getItem("Wallet")
//   if(address){
//     // await activate(injected)

//   }
//   }

//   getAddr();

// },[])



  function getLibrary(provider) {
    const k=new Web3Provider(provider)
    console.log("k: ",k);
    return k
  }

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetaMaskProvider>
          <Component {...pageProps} />
        </MetaMaskProvider>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
