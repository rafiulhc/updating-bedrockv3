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
    symbol: "BNB",
    name: "Binance",
    img: "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png?v=637697418070000000",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
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
    symbol: "DOT",
    name: "Polkadot",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    decimals: 18,
  },
  {
    symbol: "TRX",
    name: "Tron",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
    address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
    decimals: 18,
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
    decimals: 18,
  },
  {
    symbol: "SHIB",
    name: "Shiba Inu",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png",
    address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    decimals: 18,
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png",
    address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    decimals: 18,
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
    address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
    decimals: 18,
  },
  {
    symbol: "ZIL",
    name: "Zilliqa",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2469.png",
    address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
    decimals: 18,
  },
  {
    symbol: "LINK",
    name: "ChainLink",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    decimals: 18,
  },
  {
    symbol: "ETC",
    name: "Ethereum Classic",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1321.png",
    address: "0x3d6545b08693daE087E957cb1180ee38B9e3c25E",
    decimals: 18,
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
    address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
    decimals: 18,
  },
  {
    symbol: "APE",
    name: "ApeCoin",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png",
    address: "0xC762043E211571eB34f1ef377e5e8e76914962f9",
    decimals: 18,
  },
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png",
    address: "0x1Fa4a73a3F0133f0025378af00236f3aBDEE5D63",
    decimals: 18,
  },
  {
    symbol: "EOS",
    name: "EOS Token",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
    address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
    decimals: 18,
  },
  {
    symbol: "AAVE",
    name: "Aave",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png",
    address: "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
    decimals: 18,
  },
  {
    symbol: "XTZ",
    name: "Tezos Token",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png",
    address: "0x16939ef78684453bfDFb47825F8a5F714f12623a",
    decimals: 18,
  },
  {
    symbol: "AXS",
    name: "Axie Infinity",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6783.png",
    address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
    decimals: 18,
  },
  {
    symbol: "ZEC",
    name: "Zcash Token",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1437.png",
    address: "0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb",
    decimals: 18,
  },
  {
    symbol: "AXS",
    name: "Axie Infinity",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6783.png",
    address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
    decimals: 18,
  },
  {
    symbol: "AXS",
    name: "Axie Infinity",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6783.png",
    address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
    decimals: 18,
  },
  {
    symbol: "AXS",
    name: "Axie Infinity",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6783.png",
    address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
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
