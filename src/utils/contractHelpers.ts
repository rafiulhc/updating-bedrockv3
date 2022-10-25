import { ethers } from "ethers";
import { simpleRpcProvider } from "../utils/providers";

import {
  getBusdAddress,
  getBedrockAddress,
  getBedrockStakeAddress,
  getBitcoinStakeAddress,
  getBtcbAddress
} from "../utils/addressHelpers";

// ABI

import busdAbi from "../config/abi/erc20.json";
import bedrockAbi from "../config/abi/erc20.json";
import projectAbi from "../config/abi/project.json";
import stakeAbi from "../config/abi/staking.json";
import bitcoinStaking from '../config/abi/bitcoinStaking.json'


const getContract = (
  abi: any,
  address: any,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return address && new ethers.Contract(address, abi, signerOrProvider);
};

export const getBedrockProjectContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(projectAbi, address, signer);
};

export const getBusdContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(busdAbi, getBusdAddress(), signer);
};

export const getBedrockContract = (
  
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(bedrockAbi, getBedrockAddress(), signer);
};

export const getBedrockStakingContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(stakeAbi, getBedrockStakeAddress(), signer);
};

export const getBitcoinStakingContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(bitcoinStaking, getBitcoinStakeAddress(), signer);
};

export const getBtcbContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(busdAbi, getBtcbAddress(), signer)
}
