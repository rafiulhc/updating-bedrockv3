import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected } from "../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { connect } from "mongoose";

declare global {
  interface windows {
    ethereum: any;
  }
}
export const MetaMaskContext = React.createContext(null);

const checkConnection = async (activate) => {
  await activate(injected);
};

export const MetaMaskProvider = ({ children }) => {

const [localUse,setLocalUse]=useState(false)

  const { activate, account, library, connector, active, deactivate, chainId } =
    useWeb3React();

  const connect = async () => {
    if (typeof (window as any).ethereum === "undefined") {
      console.log("MetaMask is not installed!");
    } else {
      console.log("Connecting to MetaMask Wallet");
      try {
        await activate(injected);
        setLocalUse(true)
      } catch (error) {
        console.log("Error on connecting: ", error);
      }
    }
  };

  if (typeof window !== "undefined") {
    // Perform localStorage action

    const metaAddr = localStorage.getItem("Wallet");
    console.log("meta", metaAddr);
    console.log("meta accc", account);


    if(!localUse){
        if (metaAddr) {

            connect()
            console.log("its true");
          }
    }
  }

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  if (account) {
    localStorage.setItem("Wallet", account);
  }

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // const connect = async () => {
  //     console.log("connect called");

  //     if (typeof (window as any).ethereum === 'undefined') {
  //         console.log('MetaMask is not installed!')
  //     }
  //     else {
  //         console.log('Connecting to MetaMask Wallet')
  //         try {
  //             await activate(injected)

  //         } catch (error) {
  //             console.log('Error on connecting: ', error)
  //         }
  //     }
  // }

  const disconnect = async () => {
    if (typeof window !== "undefined") {
      const metaAddr = localStorage.getItem("Wallet");
      if (metaAddr) {
        console.log("jh");
        
        localStorage.removeItem("Wallet");
      }
    }

    console.log("Deactivating...");
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  };

  const values = useMemo(
    () => ({
      account,
      connect,
      disconnect,
      chainId,
      library,
    }),
    [isActive, isLoading]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};
export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
