import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import {
  getBedrockProjectContract,
  getBusdContract,
  getBedrockStakingContract,
  getBedrockContract,
  getBitcoinStakingContract,
  getBtcbContract

} from "../utils/contractHelpers";
import { getProviderOrSigner } from "../utils";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import useMetaMask from "./useMetaMask";

export const useBedrockProjectContract = (address: string) => {

  

  
  const { library, account, chainId } = useActiveWeb3React();

  // console.log("useaddress: ",account);
  // console.log("typeuseaddress: ",typeof address);
  return useMemo(
    () =>
      getBedrockProjectContract(address, getProviderOrSigner(library, account)),
    [address, account, library]
  );
};

export const useBusdContract = () => {
  const { library } = useActiveWeb3React();
  const {account} = useMetaMask();
  return useMemo(
    () => getBusdContract(getProviderOrSigner(library, account)),
    [library]
  );
};

export const useBedrockContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBedrockContract(library.getSigner()), [library])
}

export const useBedrockStakingContract = () => {
  const { library } =  useActiveWeb3React()  
  return useMemo(() => getBedrockStakingContract(library.getSigner()), [library])
}

export const useBitcoinStakingContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBitcoinStakingContract(library.getSigner()), [library])
}

export const useBtcbContract = () => {
  const { library } = useActiveWeb3React()
  const {account} = useMetaMask();
  return useMemo(() => getBtcbContract(library.getSigner()), [library,account])
}
