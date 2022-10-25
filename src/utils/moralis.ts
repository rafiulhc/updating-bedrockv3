import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';



export async function getServerSideProps(context) {
    // reads the api key from .env.local and starts Moralis SDK
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const address = '';

    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.BSC,
        address,
    });

    return {
        props: {
            address,
            // Return the native balance formatted in ether via the .ether getter
            nativeBalance: nativeBalance.result.balance.ether
        },
    };
}

