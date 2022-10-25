import addresses from "../config/constants/contracts";
declare global {
    interface windows {
        ethereum: any;
    }
}
const getChainId = async () => {
  if (typeof window !== "undefined") {
    const { ethereum } = (window as any);
    const ChainId = await ethereum.request({ method: "eth_chainId" });
    return ChainId;
  }
};

export const getAddress = async (address) => {
  const ChainId = await getChainId();
  const dec = parseInt(ChainId, 16);
  return address[dec];
};
export const getBusdAddress = async () => {
  const cdr = await getAddress(addresses.busdContract);
  return cdr;
};

export const getBedrockAddress = async () => {
  const bedrockAddress = await getAddress(addresses.bedrock);
  return bedrockAddress;
};

export const getBedrockStakeAddress = async () => {
  const bedrockStakeAddress = await getAddress(addresses.bedrockStake);
  return bedrockStakeAddress;
};

export const getBitcoinStakeAddress = async () =>{
  const bitcoinStakeAddress = await getAddress(addresses.bitcoinStaking);
  return bitcoinStakeAddress;
}

export const   getBtcbAddress = async () =>{
  const getBtcbAddress = await getAddress(addresses.btcb);
  return getBtcbAddress;
}


