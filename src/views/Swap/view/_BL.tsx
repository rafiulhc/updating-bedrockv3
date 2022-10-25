import React from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  CoinSelection,
  FormContext,
  IFormContextValue,
} from "../contexts/FormContext";

export interface Coin {
  symbol: string;
  name: string;
  img: string;
  address: string;
  decimals: number;
}

export type Field = "1" | "2";
//For Mainnet
export const coins: Coin[] = [
  {
    symbol: "BNB",
    name: "Binance",
    img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
    address: "0x51a4c0010B25d8bDB6e3B3F73FEfF3774c43F0F2",
    decimals: 18,
  },
  {
    symbol: "ROCK",
    name: "Bedrock",
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/15842.png",
    address: "0xC3387E4285e9F80A7cFDf02B4ac6cdF2476A528A",
    decimals: 18,
  },
  {
    symbol: "WBNB",
    name: "Binance",
    img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
    address: "0x51a4c0010B25d8bDB6e3B3F73FEfF3774c43F0F2",
    decimals: 18,
  },
  {
    symbol: "BUSD",
    name: "BUSD Token",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    decimals: 18,
  },
  {
    symbol: "USDT",
    name: "Tether",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
  },
];

//For Testnet(Rinkeby)
// export const coins: Coin[] = [
//   {
//     symbol: "BNB",
//     name: "Binance",
//     img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
//     address: "0x51a4c0010B25d8bDB6e3B3F73FEfF3774c43F0F2",
//     decimals: 18,
//   },
//   {
//     symbol: "BN",
//     name: "BN Token",
//     img: "https://s2.coinmarketcap.com/static/img/coins/200x200/15842.png",
//     address: "0x8fE08840A02556081EDd8b591E3323f01D288348",
//     decimals: 18,
//   },
//   {
//     symbol: "WBNB",
//     name: "Binance",
//     img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
//     address: "0x51a4c0010B25d8bDB6e3B3F73FEfF3774c43F0F2",
//     decimals: 18,
//   },
//   {
//     symbol: "EPT",
//     name: "Bitcoin",
//     img: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png",
//     address: "0xDACfD846191a4557f7C848eb8bE2C7469579D0CF",
//     decimals: 18,
//   },
//   {
//     symbol: "LPT",
//     name: "Etherium",
//     img: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png",
//     address: "0xC9c6afaef0b8bC9384841fF9c43937060B3f5227",
//     decimals: 6,
//   },
// ];
export const useBL = () => {
  const { width } = useWindowSize();
  const formContext = React.useContext(FormContext);
  const {isMobile} = useIsMobile();


  const setVal = (val: string, field: Field, val1: string) => {
    if (field === "1") {
      formContext.setForm({
        form: {
          field1: {
            ...formContext.form.field1,
            value: val,
          },
          field2: { ...formContext.form.field2, value: val1 },
        },
      });
    } else if (field === "2") {
      formContext.setForm({
        form: {
          field1: { ...formContext.form.field1, value: val1 },
          field2: {
            ...formContext.form.field2,
            value: val,
          },
        },
      });
    }
  };

  const setCoin = (coin: CoinSelection, field: Field) => {
    if (field === "1") {
      formContext.setForm({
        form: {
          field1: {
            ...formContext.form.field1,
            coin: { ...coin },
          },
          field2: { ...formContext.form.field2 },
        },
      });
    } else if (field === "2") {
      formContext.setForm({
        form: {
          field1: { ...formContext.form.field1 },
          field2: {
            ...formContext.form.field2,
            coin: { ...coin },
          },
        },
      });
    }
  };

  const swap = () => {
    formContext.setForm({
      form: {
        field1: { ...formContext.form.field2 },
        field2: { ...formContext.form.field1 },
      },
    });
  };

  return { coins, formContext, setVal, setCoin, swap, isMobile };
};
