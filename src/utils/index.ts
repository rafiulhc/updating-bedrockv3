import { getAddress } from "@ethersproject/address"
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {

  // console.log("library: ",library);

  const k=library.getSigner(account).connectUnchecked();
  
  return k;


}

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getProviderOrSigner(
  // signer,
  library: Web3Provider,
  account?: string,
  
): Web3Provider | JsonRpcSigner {
  // return signer &&  getSigner(signer, account);


  
  return account ? getSigner(library, account) : library;


}

// account is optional
// export function getContract(address: string, ABI: any, signer?: ethers.Signer | ethers.providers.Provider): Contract {
//   if (!isAddress(address) || address === AddressZero) {
//     throw Error(`Invalid 'address' parameter '${address}'.`)
//   }
