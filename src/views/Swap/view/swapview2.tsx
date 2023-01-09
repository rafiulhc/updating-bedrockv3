import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../../components/Footer/index";
import Navbar from "../../../components/Navbar/index";
import useMetaMask from "../../../hooks/useMetaMask";
import { ethers } from "ethers";
import axios from "axios";
import { EvmChain } from '@moralisweb3/evm-utils';
import BigNumber from "bignumber.js";
import {
  SectionMargin,
  Title,
  SwapForm,
  InputField,
  InputSlippage,
  Select,
  SwapButton,
  Background,
} from "../components/index";
import { useBL, Field } from "./_BL";
let routerContractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
let factoryContractAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
let pancakePairAddress: string;
import PancakeRouterAbi from "../../../config/abi/PancakeRouter.json";
import PancakeFactoryAbi from "../../../config/abi/PancakeFactory.json";
import ERC20_ABI from "../../../config/abi/erc20";
import Moralis from "moralis";

const InputFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 15px;
  gap: 40px;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SubmitButton = styled.input`
  border-radius: 60px;
  font-size: 14px;
  font-weight: 300;
  line-height: 16.8px;
  background-color: #ec8845;
  color: #ffffff;
  border: none;
  padding: 14px 37px;
  witdh: auto;
`;

const MaxButton = styled.button`
  border-radius: 60px;
  font-size: 14px;
  font-weight: 300;
  line-height: 16.8px;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.75);
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 10px 24px;
  transition: all 0.4s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
  }
`;

const BalanceText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
  color: white;
  opacity: 0.55;
  & > :nth-child(2) {
    width: 100%;
    text-align: right;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding-bottom: 200px;
`;

interface InvertProps {
  onClick: () => void;
}

const Invert: React.FC<InvertProps> = ({ onClick }: InvertProps) => {
  return (
    <svg
      onClick={() => onClick()}
      viewBox="0 0 24 24"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"

    >
      <path
        d="M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z"
        fill="#E98331"
      ></path>
    </svg>
  );
};

interface SwapViewProps extends PropsWithChildren {}
export const SwapView: React.FC<SwapViewProps> = ({}: SwapViewProps) => {
  const { coins, formContext, setVal, setCoin, swap, isMobile } = useBL();
  const { account, library } = useMetaMask();
  const [routerContract, setRouterContract] =
    React.useState<ethers.Contract | null>();
  const [factoryContract, setFactoryContract] =
    React.useState<ethers.Contract | null>();
  const [path, setPath] = useState<string[]>([""]);
  const [balanceCoin1, setBalanceCoin1] = useState<string>("");
  const [balanceCoin2, setBalanceCoin2] = useState<string>("");
  const [field1, setField1] = useState<ethers.FixedNumber>(
    ethers.FixedNumber.from(0)
  );
  const [field2, setField2] = useState<ethers.FixedNumber>(
    ethers.FixedNumber.from(0)
  );

  const [slippage, setSlippage] = useState("")
  const [showInverted, setShowInverted] = useState(true);
  const [metamaskState, setMetamaskState] = useState("");
  const [platformFee, setPlatformFee] = useState<any>(0)
  const [fieldOne, setFieldOne] = useState(0)
  const [fieldTwo, setFieldTwo] = useState(0)
  const [valueForRate, setValueForRate] = useState("")
  useEffect(() => {
    const getBNBValueOneUSD = async () => {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        // ...and any other configuration
    });
      let price = await Moralis.EvmApi.token.getTokenPrice({address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", chain: EvmChain.BSC})
      const bnbPriceUsd = parseInt(price.result.usdPrice.toString());
      const oneDollarBnb = 1/bnbPriceUsd
      setPlatformFee(oneDollarBnb.toFixed(6))
    }

    getBNBValueOneUSD();

  }, []);

  const getValueOne = async () => {

    let price = await Moralis.EvmApi.token.getTokenPrice({address: formContext.form.field1.coin.address, chain: EvmChain.BSC})
    let PriceUsdOne = price.result.usdPrice
    setFieldOne(PriceUsdOne)
  }

  const getValueTwo = async () => {

    let price = await Moralis.EvmApi.token.getTokenPrice({address: formContext.form.field2.coin.address, chain: EvmChain.BSC})
    let PriceUsdTwo = price.result.usdPrice
    setFieldTwo(PriceUsdTwo)
  }

  React.useEffect(()=>{
    getValueOne();
    getValueTwo();
  },[fieldOne, fieldTwo, formContext.form.field1.value, formContext.form.field2.value, formContext.form.field1.coin.address,
    formContext.form.field2.coin.address,
    ])
  React.useEffect(()=>{
    setBalances()
  },[fieldOne, fieldTwo, formContext.form.field1.value, formContext.form.field2.value, formContext.form.field1.coin.address,
    formContext.form.field2.coin.address, balanceCoin1, balanceCoin2
    ])

  const calculatePriceRateFieldOne = async (val: string) => {
    formContext.form.field2.value = (Number(val) * fieldOne / fieldTwo).toString()
  }
  const calculatePriceRateFieldTwo = async (val: string) => {
    formContext.form.field1.value = (Number(val) * fieldTwo / fieldOne).toString()
  }

  const setBalances = async () => {
    const signer = library.getSigner();
    let router = new ethers.Contract(
      routerContractAddress,
      PancakeRouterAbi,
      signer
    );
    setRouterContract(router);
    let factory = new ethers.Contract(
      factoryContractAddress,
      PancakeFactoryAbi,
      signer
    );
    setFactoryContract(factory);
    await getPair(factory, signer);
  };

  const getReserveValues = async (
    factory: ethers.Contract,
    token0: string,
    token1: string
  ) => {
    pancakePairAddress = await factory.getPair(token0, token1);
  };

  const getPair = async (factory: ethers.Contract, signer: ethers.Signer) => {
    if (
      formContext.form.field1.coin.address !==
      formContext.form.field2.coin.address
    ) {
      let coin1 = new ethers.Contract(
        formContext.form.field1.coin.address,
        ERC20_ABI,
        signer
      );
      let coin2 = new ethers.Contract(
        formContext.form.field2.coin.address,
        ERC20_ABI,
        signer
      );

      if (formContext.form.field1.coin.symbol === "BNB") {
        setBalanceCoin1(
          ethers.FixedNumber.from(await library.getBalance(account))
            .divUnsafe(ethers.FixedNumber.from(ethers.utils.parseEther("1")))
            .toString()
        );
        setBalanceCoin2(
          ethers.FixedNumber.from((await coin2.balanceOf(account)).toString())
            .divUnsafe(
              formContext.form.field2.coin.decimals === 18
                ? ethers.FixedNumber.from(
                    ethers.utils.parseEther("1").toString()
                  )
                : ethers.FixedNumber.from(
                    10 ** formContext.form.field2.coin.decimals
                  )
            )
            .toString()
        );
      } else if (formContext.form.field2.coin.symbol === "BNB") {
        setBalanceCoin1(
          ethers.FixedNumber.from((await coin1.balanceOf(account)).toString())
            .divUnsafe(
              formContext.form.field1.coin.decimals === 18
                ? ethers.FixedNumber.from(
                    ethers.utils.parseEther("1").toString()
                  )
                : ethers.FixedNumber.from(
                    10 ** formContext.form.field1.coin.decimals
                  )
            )
            .toString()
        );
        setBalanceCoin2(
          ethers.FixedNumber.from(await library.getBalance(account))
            .divUnsafe(ethers.FixedNumber.from(ethers.utils.parseEther("1")))
            .toString()
        );
      } else {
        setBalanceCoin1(
          ethers.FixedNumber.from((await coin1.balanceOf(account)).toString())
            .divUnsafe(
              formContext.form.field1.coin.decimals === 18
                ? ethers.FixedNumber.from(
                    ethers.utils.parseEther("1").toString()
                  )
                : ethers.FixedNumber.from(
                    10 ** formContext.form.field1.coin.decimals
                  )
            )
            .toString()
        );
        setBalanceCoin2(
          ethers.FixedNumber.from((await coin2.balanceOf(account)).toString())
            .divUnsafe(
              formContext.form.field2.coin.decimals === 18
                ? ethers.FixedNumber.from(
                    ethers.utils.parseEther("1").toString()
                  )
                : ethers.FixedNumber.from(
                    10 ** formContext.form.field2.coin.decimals
                  )
            )
            .toString()
        );
      }
      try {
        await getReserveValues(
          factory,
          formContext.form.field1.coin.address,
          formContext.form.field2.coin.address
        );
        setPath([
          formContext.form.field1.coin.address,
          formContext.form.field2.coin.address,
        ]);
      } catch (e) {
        if (e.message.includes('data="0x"')) {
          try {
            await getReserveValues(
              factory,
              formContext.form.field1.coin.address,
              coins[1].address
            );
            await getReserveValues(
              factory,
              coins[1].address,
              formContext.form.field2.coin.address
            );
            setPath([
              formContext.form.field1.coin.address,
              coins[1].address,
              formContext.form.field2.coin.address,
            ]);
          } catch (e) {
            if (e.message.includes('data="0x"')) {
              try {
                await getReserveValues(
                  factory,
                  formContext.form.field1.coin.address,
                  coins[2].address
                );
                await getReserveValues(
                  factory,
                  coins[2].address,
                  formContext.form.field2.coin.address
                );
                setPath([
                  formContext.form.field1.coin.address,
                  coins[2].address,
                  formContext.form.field2.coin.address,
                ]);
              } catch (e) {
                if (e.message.includes('data="0x"')) {
                }
              }
            }
          }
        }
      }
    }
  };

  const swapTokens = async () => {
    console.log(slippage)
    if (
      account &&
      library &&
      formContext.form.field1.value &&
      ethers.FixedNumber.from(formContext.form.field1.value) >
        ethers.FixedNumber.from(0)
    ) {
      try {
        let amountToSwap =
          formContext.form.field1.coin.decimals === 18
            ? ethers.utils.parseEther(formContext.form.field1.value)
            : ethers.FixedNumber.from(formContext.form.field1.value).mulUnsafe(
                ethers.FixedNumber.from(
                  10 ** formContext.form.field1.coin.decimals
                )
              );
        let amountToOut =
          formContext.form.field2.coin.decimals === 18
            ? ethers.utils.parseEther(formContext.form.field2.value)
            : ethers.FixedNumber.from(formContext.form.field2.value).mulUnsafe(
                ethers.FixedNumber.from(
                  10 ** formContext.form.field2.coin.decimals
                )
              );
              if ( formContext.form.field1.coin.address === coins[0].address && formContext.form.field2.coin.address === coins[1].address ) {
                setMetamaskState("Step 1 of 2: Confirm platform fee");

                let signer = library.getSigner();
                let tx = await signer.sendTransaction({
                  to: "0xab02fEf5C2eB7aC7b56b6853c61376692D5c6ABc",
                  value: ethers.utils.parseEther(platformFee) // 0.0001 ether/bnb
                })
                // await tx.wait();

                  setMetamaskState("Step 2 of 2: Confirm swap");
                  if(Number(formContext.form.field2.value) < 10000){
                    tx = await routerContract.swapETHForExactTokens(
                  ethers.utils.parseUnits(amountToOut.toString(), "wei"),
                  path,
                  account,
                  Date.now() + 60 * 20,
                  {
                    value: ethers.utils.parseUnits((Number(amountToSwap)/100*(100 + Number(slippage))).toString(), "wei"),
                    gasPrice: ethers.utils.parseUnits("20", "gwei")
                  }
                );
                  await tx.wait();
                  setTimeout(() => {
                    setMetamaskState("");
                  }, 4000);
                  setMetamaskState("Transaction successfull");
                  formContext.form.field1.value = "0"
                  formContext.form.field2.value = "0"
                  } else if (Number(formContext.form.field2.value) < 100000) {
                    tx = await routerContract.swapETHForExactTokens(
                      ethers.utils.parseUnits(amountToOut.toString(), "wei"),
                      path,
                      account,
                      Date.now() + 60 * 20,
                      {
                        value: ethers.utils.parseUnits((Number(amountToSwap)/100*(100 + Number(slippage))).toString(), "wei"),
                        gasPrice: ethers.utils.parseUnits("30", "gwei")
                      }
                    );
                      await tx.wait();
                      setTimeout(() => {
                        setMetamaskState("");
                      }, 4000);
                      setMetamaskState("Transaction successfull");
                      formContext.form.field1.value = "0"
                      formContext.form.field2.value = "0"
                  } else if( Number(formContext.form.field2.value) < 1000000) {
                    tx = await routerContract.swapETHForExactTokens(
                      ethers.utils.parseUnits(amountToOut.toString(), "wei"),
                      path,
                      account,
                      Date.now() + 60 * 20,
                      {
                        value: ethers.utils.parseUnits((Number(amountToSwap)/100*(100 + Number(slippage))).toString(), "wei"),
                        gasPrice: ethers.utils.parseUnits("40", "gwei")
                      }
                    );
                      await tx.wait();
                      setTimeout(() => {
                        setMetamaskState("");
                      }, 4000);
                      setMetamaskState("Transaction successfull");
                      formContext.form.field1.value = "0"
                      formContext.form.field2.value = "0"
                  }else{
                    tx = await routerContract.swapETHForExactTokens(
                      ethers.utils.parseUnits(amountToOut.toString(), "wei"),
                      path,
                      account,
                      Date.now() + 60 * 20,
                      {
                        value: ethers.utils.parseUnits((Number(amountToSwap)/100*(100 + Number(slippage))).toString(), "wei"),
                        gasPrice: ethers.utils.parseUnits("60", "gwei")
                      }
                    );
                      await tx.wait();
                      setTimeout(() => {
                        setMetamaskState("");
                      }, 4000);
                      setMetamaskState("Transaction successfull");
                      formContext.form.field1.value = "0"
                      formContext.form.field2.value = "0"
                  }
              }

        if (formContext.form.field1.coin.address === coins[0].address) {
          setMetamaskState("Step 1 of 2: Confirm platform fee");

          let signer = library.getSigner();
          let tx = await signer.sendTransaction({
            to: "0xab02fEf5C2eB7aC7b56b6853c61376692D5c6ABc",
            value: ethers.utils.parseEther(platformFee) // 0.0001 ether/bnb
          })
          // await tx.wait();

          setMetamaskState("Step 2 of 2: Confirm swap");
          tx = await routerContract.swapETHForExactTokens(
            ethers.utils.parseUnits(amountToOut.toString(), "wei"),
            path,
            account,
            Date.now() + 60 * 20,
            {
              value: ethers.utils.parseUnits((Number(amountToSwap)/100*(100 + Number(slippage))).toString(), "wei"),
              gasLimit: 1000000
            }
          );
          await tx.wait();
          setTimeout(() => {
            setMetamaskState("");
          }, 4000);
          setMetamaskState("Transaction successfull");
          formContext.form.field1.value = "0"
          formContext.form.field2.value = "0"

        } else if (formContext.form.field2.coin.address === coins[0].address) {
         setMetamaskState("Step 1 of 3: Confirm platform fee");
          let signer = library.getSigner();
          let tx = await signer.sendTransaction({
            to: "0xab02fEf5C2eB7aC7b56b6853c61376692D5c6ABc",
            value: ethers.utils.parseEther(platformFee) // 0.0001 ether/bnb
          })
          // await tx.wait();
          setMetamaskState(
            `Step 2 of 3: Allowing ${formContext.form.field1.coin.symbol} to swap`
          );
          let tokenContract = await new ethers.Contract(
            formContext.form.field1.coin.address,
            ERC20_ABI,
            library.getSigner()
          );

          tx = await tokenContract.approve(
            routerContract.address,
            ethers.utils.parseUnits(amountToSwap.toString(), "wei")
          );
          await tx.wait();
          setMetamaskState("Step 3 of 3: Confirm Swap transaction");
          tx = await routerContract.swapExactTokensForETH(
            ethers.utils.parseUnits(amountToSwap.toString(), "wei"),
            1,
            path,
            account,
            Date.now() + 60 * 20
          );
          await tx.wait();
          setTimeout(() => {
            setMetamaskState("");
          }, 4000);
          setMetamaskState("Transaction successful");
          formContext.form.field1.value = "0"
          formContext.form.field2.value = "0"
        }
        else if (formContext.form.field1.coin.address === coins[1].address && formContext.form.field2.coin.address === "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" ||
          formContext.form.field1.coin.address === "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" && formContext.form.field2.coin.address === coins[1].address
          ) {
          setMetamaskState("Step 1 of 3: Confirm platform fee");
          let signer = library.getSigner();
          let tx = await signer.sendTransaction({
            to: "0xab02fEf5C2eB7aC7b56b6853c61376692D5c6ABc",
            value: ethers.utils.parseEther(platformFee) // 0.0001 ether/bnb
          })
          // await tx.wait();
          setMetamaskState(
            `Step 2 of 3: Allowing ${formContext.form.field1.coin.symbol} to swap`
          );
          let tokenContract = await new ethers.Contract(
            formContext.form.field1.coin.address,
            ERC20_ABI,
            library.getSigner()
          );

          tx = await tokenContract.approve(
            routerContract.address,
            ethers.utils.parseUnits(amountToSwap.toString(), "wei")
          );
          await tx.wait();
          setMetamaskState("Step 3 of 3: Confirm Swap transaction");
          tx = await routerContract.swapExactTokensForTokens(
            ethers.utils.parseUnits(amountToSwap.toString(), "wei"),
            1,
            path,
            account,
            Date.now() + 60 * 20,
            {
              gasLimit: 1000000
            }
          );

          await tx.wait();
          setTimeout(() => {
            setMetamaskState("");
          }, 4000);
          setMetamaskState("Transaction successful");
          formContext.form.field1.value = "0"
          formContext.form.field2.value = "0"
        } else {
        setMetamaskState("Step 1 of 3: Confirm platform fee");
          let signer = library.getSigner();
          let tx = await signer.sendTransaction({
            to: "0xab02fEf5C2eB7aC7b56b6853c61376692D5c6ABc",
            value: ethers.utils.parseEther(platformFee) // 0.0001 ether/bnb
          })
          // await tx.wait();
          setMetamaskState(
            `Step 2 of 3: Allowing ${formContext.form.field1.coin.symbol} to swap`
          );
          let tokenContract = await new ethers.Contract(
            formContext.form.field1.coin.address,
            ERC20_ABI,
            library.getSigner()
          );

          tx = await tokenContract.approve(
            routerContract.address,
            ethers.utils.parseUnits(amountToSwap.toString(), "wei")
          );
          await tx.wait();
          setMetamaskState("Step 3 of 3: Confirm Swap transaction");
          tx = await routerContract.swapExactTokensForTokens(
            ethers.utils.parseUnits(amountToSwap.toString(), "wei"),
            ethers.utils.parseUnits((Number(amountToSwap)/100*(100 - Number(slippage))).toString(), "wei"),
            path,
            account,
            Date.now() + 60 * 20,
            {
              gasLimit: 1000000
            }
          );

          await tx.wait();
          setTimeout(() => {
            setMetamaskState("");
          }, 4000);
          setMetamaskState("Transaction successful");
          formContext.form.field1.value = "0"
          formContext.form.field2.value = "0"
        }
        await getPair(factoryContract, library.getSigner());
      } catch (e) {
        console.log(e.code)
        setTimeout(() => {
          setMetamaskState("");
        }, 4000);
        setMetamaskState("Error");
        formContext.form.field1.value = "0"
        formContext.form.field2.value = "0"
      }
    }

  };

  const setValue = async (
    val: string,
    field: Field,
    decimals0: number,
    decimals1: number,
    decimals2: number = 0
  ) => {
    let index: number = val.indexOf(".");
    if (index === 0) {
      val = "0".concat(val);
      index = val.indexOf(".");
    }
    if (index !== -1)
      val =
        parseInt(val.substring(0, index)).toString() +
        val.substring(index, val.length);
    let check: boolean =
      index >= 0 ? val.length - index < 20 && index <= 20 : val.length <= 20;
    if (val !== "" && check && parseFloat(val) > 0) {
      let val0 = val;
      let val1: any;
      let outValue;
      try {
        if (decimals2 === 0) {
          if (parseInt(field) === 1) {
            let Value =
              decimals0 === 18
                ? ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(
                      ethers.utils.parseEther("1").toString()
                    )
                  )
                : ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(10 ** decimals0)
                  );
            setField1(ethers.FixedNumber.from(val));
            [, val1] = await routerContract.getAmountsOut(
              Value.toString().substring(0, Value.toString().length - 2),
              path
            );
            outValue = ethers.FixedNumber.from(val1.toString()).divUnsafe(
              decimals1 === 18
                ? ethers.FixedNumber.from(ethers.utils.parseEther("1"))
                : ethers.FixedNumber.from(10 ** decimals1)
            );
            setField2(outValue);
          } else {
            let Value =
              decimals1 === 18
                ? ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(
                      ethers.utils.parseEther("1").toString()
                    )
                  )
                : ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(10 ** decimals1)
                  );
            setField2(ethers.FixedNumber.from(val));
            [, val1] = await routerContract.getAmountsOut(
              Value.toString().substring(0, Value.toString().length - 2),
              [path[1], path[0]]
            );
            outValue = ethers.FixedNumber.from(val1.toString()).divUnsafe(
              decimals0 === 18
                ? ethers.FixedNumber.from(ethers.utils.parseEther("1"))
                : ethers.FixedNumber.from(10 ** decimals0)
            );
            setField1(outValue);
          }
        } else {
          if (parseInt(field) === 1) {
            let Value =
              decimals0 === 18
                ? ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(
                      ethers.utils.parseEther("1").toString()
                    )
                  )
                : ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(10 ** decimals0)
                  );
            setField1(Value);
            [, val1] = await routerContract.getAmountsOut(
              Value.toString().substring(0, Value.toString().length - 2),
              [path[0], path[1]]
            );
            [, val1] = await routerContract.getAmountsOut(val1, [
              path[1],
              path[2],
            ]);
            outValue = ethers.FixedNumber.from(val1.toString()).divUnsafe(
              decimals1 === 18
                ? ethers.FixedNumber.from(ethers.utils.parseEther("1"))
                : ethers.FixedNumber.from(10 ** decimals1)
            );
            setField2(outValue);
          } else {
            let Value =
              decimals1 === 18
                ? ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(
                      ethers.utils.parseEther("1").toString()
                    )
                  )
                : ethers.FixedNumber.from(val).mulUnsafe(
                    ethers.FixedNumber.from(10 ** decimals1)
                  );
            setField2(ethers.FixedNumber.from(val));
            [, val1] = await routerContract.getAmountsOut(
              Value.toString().substring(0, Value.toString().length - 2),
              [path[2], path[1]]
            );
            [, val1] = await routerContract.getAmountsOut(val1, [
              path[1],
              path[0],
            ]);
            outValue = ethers.FixedNumber.from(val1.toString()).divUnsafe(
              decimals0 === 18
                ? ethers.FixedNumber.from(ethers.utils.parseEther("1"))
                : ethers.FixedNumber.from(10 ** decimals0)
            );
            setField1(outValue);
          }
        }
        setVal(
          val0,
          field,
          outValue.toString().substring(0, outValue.toString().indexOf(".") + 5)
        );
      } catch (e) {
        console.log("Error ", e);
      }
    } else {
      setVal(val, field, "0");
    }
  };

  const maxPress = () => {

    setBalances()

    let balance =
      formContext.form.field1.coin.symbol === "BNB"
        ? parseFloat(balanceCoin1) - 0.01 > 0
          ? (parseFloat(balanceCoin1) - 0.01).toString()
          : ((parseFloat(balanceCoin1) - 0.01) * -1).toString()
        : balanceCoin1;
    let index = balance.indexOf(".");
    if (index !== -1) {
      balance = balance.substring(0, index + 19);
    }
    setValue(
      balance,
      "1",
      formContext.form.field1.coin.decimals,
      formContext.form.field2.coin.decimals
    );
  };

  useEffect(() => {

    setCoin({ ...coins[0], index: 0 }, "1");
    setCoin({ ...coins[1], index: 1 }, "2");
  }, []);

  React.useEffect(() => {
    if (account) {
      setBalances();
    }
  }, [account]);

  React.useEffect(() => {
    if (library) {
      getPair(factoryContract, library.getSigner());
    }
  }, [
    formContext.form.field1.coin.address,
    formContext.form.field2.coin.address,
  ]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Navbar />
      <ContentContainer>
        <Background isMobile={isMobile} />
        <SectionMargin
          style={{ marginTop: "0px", zIndex: 2, marginBottom: "-30px" }}
        >
         {/* <Title>Trade with Bedrock Finance</Title> */}
        </SectionMargin>
        <SectionMargin style={{ zIndex: 4 }}>
          <SwapForm onSubmit={(e) => e.preventDefault()}>
            <InputFieldsContainer data-aos="fade-up">
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Select
                    field="1"
                    coins={coins}
                    defaultIndex={0}
                    onSelection={(e) => {
                      formContext.form.field1.value = "0"
                      formContext.form.field2.value = "0"

                      getValueOne()
                      getValueTwo()

                      if (
                        e.selection.address ===
                        formContext.form.field2.coin.address
                      ) {
                        let temp = balanceCoin1;
                        setBalanceCoin1(balanceCoin2);
                        setBalanceCoin2(temp);
                      } else {
                        setCoin(e.selection, "1");

                      }
                    }}
                  ></Select>
                  <BalanceText>
                    <div>Balance: {balanceCoin1}</div>
                  </BalanceText>
                </div>
                <div style={{ position: "relative" }}>
                  <InputField

                    value={formContext.form.field1.value}
                    onChange={(val) => {

                      getValueOne()
                      getValueTwo()

                      calculatePriceRateFieldOne(val)
                      formContext.form.field2.value = ((Number(val) * fieldOne / fieldTwo)/400*397).toFixed(8).toString()
                      setVal(val, "1", formContext.form.field2.value)
                      setValueForRate(val)
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: 6,
                      top: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaxButton onClick={() => maxPress()}>Max</MaxButton>
                  </div>
                </div>
                <div style={{ margin:"5px", display: "flex", color: "white",  }}>
                <div>
                <BalanceText style={{marginLeft:"50px", display: "flex", justifyContent: "flex-start", color: "white" }}>BUSD: ${(Number(fieldOne)*Number(formContext.form.field1.value)).toFixed(2)}</ BalanceText>
                </div>

                </div>
              </div>
              <SwapButton
                onPress={() => {
                  swap();

                  setShowInverted(!showInverted)
                  formContext.form.field1.value = "0"
                  formContext.form.field2.value = "0"
                  let temp = balanceCoin1;
                  setBalanceCoin1(balanceCoin2);
                  setBalanceCoin2(temp);
                }}
              ></SwapButton>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Select
                    field="2"
                    coins={coins}
                    defaultIndex={1}
                    onSelection={(e) => {
                      formContext.form.field1.value = "0"
                      formContext.form.field2.value = "0"
                        getValueOne()
                        getValueTwo()

                      if (
                        e.selection.address ===
                        formContext.form.field1.coin.address
                      ) {
                        let temp = balanceCoin1;
                        setBalanceCoin1(balanceCoin2);
                        setBalanceCoin2(temp);
                      } else {
                        setCoin(e.selection, "2");
                      }
                    }}
                  ></Select>
                  <BalanceText>
                    <div>Balance: {balanceCoin2}</div>
                  </BalanceText>
                </div>
                <div style={{ position: "relative" }}>
                  <InputField

                    type={"number"}
                    value={formContext.form.field2.value}
                    onChange={(val) => {

                      getValueOne()
                      getValueTwo()

                      calculatePriceRateFieldTwo(val)
                      formContext.form.field1.value = ((Number(val) * fieldTwo / fieldOne)/400*403).toFixed(8).toString()
                      setVal(val, "2", formContext.form.field1.value)
                      setValueForRate(val)
                    }}
                  />
                </div>
              <BalanceText style={{marginLeft:"50px", display: "flex", justifyContent: "flex-start", color: "white" }}>BUSD: ${(Number(fieldTwo)*Number(formContext.form.field2.value)).toFixed(2)}</ BalanceText>
              </div>
              <SubmitButtonContainer>
                {metamaskState.length > 0 && (
                  <span
                    style={{
                      color: "#FFFFFF",
                      alignContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {metamaskState}
                  </span>
                )}

                <SubmitButton
                  onClick={swapTokens}
                  type={"submit"}
                  value="Swap"
                  disabled={
                    !(
                      formContext.form.field1.value.length -
                      formContext.form.field1.value.indexOf(".") <
                      20
                    ) ||
                    !(
                      formContext.form.field2.value.length -
                      formContext.form.field2.value.indexOf(".")! <
                      20
                    )
                  }
                />
                <div style={{ display: "flex", color: "white", justifyContent: "center", margin: "20px" , padding:"10px" }}>
                <h6 style={{margin: "5px"}}>Slippage</h6>
                <InputSlippage
                onChange={(val)=> {
                  setSlippage(val)
                  console.log("slippage",val)
                }}
                />
                </div>
              </SubmitButtonContainer>
            </InputFieldsContainer>
            <span style={{ color: "#FFFFFF" }}>
              {showInverted ? (
                Number(formContext.form.field1.value) > 0 ? (
                  <>
                    <span>
                      {`Price ${((fieldOne/fieldTwo)/400*397).toFixed(6)}
                      ${formContext.form.field2.coin.symbol} per ${
                        formContext.form.field1.coin.symbol
                      }   `}
                    </span>
                    <Invert
                      onClick={() => setShowInverted(!showInverted)}
                    ></Invert>
                  </>
                ) : (
                  ""
                )
              ) : Number(formContext.form.field2.value) > 0 ? (
                <>
                  <span>
                    {`Price ${((fieldTwo/fieldOne)/400*403).toFixed(6)}
                    ${formContext.form.field1.coin.symbol} per ${
                      formContext.form.field2.coin.symbol
                    }    `}
                  </span>

                  <Invert

                    onClick={() => setShowInverted(!showInverted)}
                  ></Invert>

                </>
              ) : (
                ""
              )}
            </span>
          </SwapForm>
        </SectionMargin>
      </ContentContainer>
      <Footer />
    </div>
  );
};