import React from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import useWindowSize from "../../../hooks/useWindowSize";
import { CoinSelection, FormContext } from "../contexts/FormContext";

export interface Coin {
  symbol: string;
  name: string;
  img: string;
  address: string;
  decimals: number;
}

export type Field = "1" | "2";

export const coins: Coin[] = [
  {
    symbol: "ROCK",
    name: "Bedrock",
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/15842.png",
    address: "0xC3387E4285e9F80A7cFDf02B4ac6cdF2476A528A",
    decimals: 18,
  },
  {
    symbol: "BNB",
    name: "Binance",
    img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
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
    symbol: "WBNB",
    name: "Binance",
    img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
  },
  {
    symbol: "USDT",
    name: "Tether",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    decimals: 18,
  },
  {
    symbol: "BTCB",
    name: "Binance BTC",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    decimals: 18,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    decimals: 18,
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    decimals: 8,
  },
  {
    symbol: "ADA",
    name: "Cardano",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    decimals: 18,
  },
  {
    symbol: "MATIC",
    name: "Matic Token",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
    address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
    decimals: 18,
  },
  {
    symbol: "DAI",
    name: "Dai Token",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
    address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    decimals: 18,
  },
  {
    symbol: "Dot",
    name: "Polkadot",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    decimals: 18,
  },

];

export const useBL = () => {
  const { width } = useWindowSize();
  const formContext = React.useContext(FormContext);
  const { isMobile } = useIsMobile();

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
          field2: {
            ...formContext.form.field1,
            coin: { ...coin },
          },
          field1: { ...formContext.form.field2 },
        },
      });
    } else if (field === "2") {
      formContext.setForm({
        form: {
          field2: { ...formContext.form.field1 },
          field1: {
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