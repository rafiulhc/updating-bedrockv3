import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../../components/Footer/index";
import Navbar from "../../../components/Navbar/index";
import useMetaMask from "../../../hooks/useMetaMask";
import { ethers } from "ethers";
import {
  SectionMargin,
  Title,
  SwapForm,
  InputField,
  Select,
  SwapButton,
  Blob1,
  Blob2,
  Blob2Corner,
  Background,
} from "../components/index";
import { useBL, Field } from "./_BL";
//let routerContractAddress = "0x31afae70bd54a826fee6568865bc80e2bbdc3403"; //testnet
let routerContractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
//let factoryContractAddress = "0x0689B41b16400784D5D6d6f20Dc3A9aD422A78C2"; //testnet
let factoryContractAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
let pancakePairAddress: string;
import PancakeRouterAbi from "../../../config/abi/PancakeRouter.json";
import PancakeFactoryAbi from "../../../config/abi/PancakeFactory.json";
import PancakePairAbi from "../../../config/abi/PancakePair.json";
import ERC20_ABI from "../../../config/abi/erc20";
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
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding-bottom: 200px;
`;

const Blob2Container = styled.div`
  z-index: -1;
  position: absolute;
  top: 0px;
  left: 50%;
  width: 900px;
  filter: blur(270px);

  @media (max-width: 768px) {
    top: 250px;
    width: 100%;
    filter: blur(100px);
  }
`;

const Blob1Container = styled.div`
  z-index: -1;
  position: absolute;
  bottom: 0;
  right: 50%;
  width: 900px;
  filter: blur(150px);

  @media (max-width: 768px) {
    width: 100%;
    filter: blur(100px);
    left: 0;
    bottom: 200px;
  }
`;

interface SwapViewProps extends PropsWithChildren {}
export const SwapView: React.FC<SwapViewProps> = ({}: SwapViewProps) => {
  const { coins, formContext, setVal, setCoin, swap, isMobile } = useBL();
  const { account, library } = useMetaMask();
  const [routerContract, setRouterContract] =
    React.useState<ethers.Contract | null>();
  const [factoryContract, setFactoryContract] =
    React.useState<ethers.Contract | null>();
  const [pancakePairContract, setPancakePairContract] =
    React.useState<ethers.Contract | null>();
  const [reserve0, setReserve0] = React.useState<ethers.BigNumber>();
  const [reserve1, setReserve1] = React.useState<ethers.BigNumber>();
  const [reserve2, setReserve2] = React.useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [reserve3, setReserve3] = React.useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [path, setPath] = useState<string[]>([""]);

  const setReserves = async () => {
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
    signer: ethers.Signer,
    token0: string,
    token1: string
  ) => {
    let res0 = ethers.BigNumber.from(0),
      res1 = ethers.BigNumber.from(0);
    pancakePairAddress = await factory.getPair(token0, token1);
    let pancakePair = new ethers.Contract(
      pancakePairAddress,
      PancakePairAbi,
      signer
    );
    setPancakePairContract(pancakePair);
    [res0, res1] = await pancakePair.getReserves();
    return [res0, res1];
  };

  const getPair = async (factory: ethers.Contract, signer: ethers.Signer) => {
    if (
      formContext.form.field1.coin.address !==
      formContext.form.field2.coin.address
    ) {
      let res0 = ethers.BigNumber.from(0),
        res1 = ethers.BigNumber.from(0);
      try {
        [res0, res1] = await getReserveValues(
          factory,
          signer,
          formContext.form.field1.coin.address,
          formContext.form.field2.coin.address
          //coins[1].address
        );
        setReserve0(res0);
        setReserve1(res1);
        setReserve2(ethers.BigNumber.from(0));
        setReserve3(ethers.BigNumber.from(0));
        setPath([
          formContext.form.field1.coin.address,
          formContext.form.field2.coin.address,
        ]);
      } catch (e) {
        if (e.message.includes('data="0x"')) {
          try {
            [res0, res1] = await getReserveValues(
              factory,
              signer,
              formContext.form.field1.coin.address,
              coins[0].address
            );
            setReserve0(res0);
            setReserve1(res1);
            [res0, res1] = await getReserveValues(
              factory,
              signer,
              coins[0].address,
              formContext.form.field2.coin.address
            );
            setReserve2(res0);
            setReserve3(res1);
            setPath([
              formContext.form.field1.coin.address,
              coins[0].address,
              formContext.form.field2.coin.address,
            ]);
          } catch (e) {
            if (e.message.includes('data="0x"')) {
              try {
                [res0, res1] = await getReserveValues(
                  factory,
                  signer,
                  formContext.form.field1.coin.address,
                  coins[1].address
                );
                setReserve0(res0);
                setReserve1(res1);
                [res0, res1] = await getReserveValues(
                  factory,
                  signer,
                  coins[1].address,
                  formContext.form.field2.coin.address
                );
                setReserve2(res0);
                setReserve3(res1);
                setPath([
                  formContext.form.field1.coin.address,
                  coins[1].address,
                  formContext.form.field2.coin.address,
                ]);
              } catch (e) {
                if (e.message.includes('data="0x"')) {
                  console.log("Failed to find path");
                }
              }
            }
          }
        }
      }
    }
  };

  const amountCalc = (
    val: ethers.FixedNumber,
    reserveIn: ethers.BigNumber,
    reserveOut: ethers.BigNumber,
    decimals0: number,
    decimals1: number
  ) => {
    let amountInWithFee: ethers.FixedNumber = val.mulUnsafe(
      ethers.FixedNumber.from(9975)
    );
    let Decimals0 =
      decimals0 === 18
        ? ethers.FixedNumber.from(ethers.utils.parseEther("1"))
        : ethers.FixedNumber.from(10 ** decimals0);
    let Decimals1 =
      decimals1 === 18
        ? ethers.FixedNumber.from(ethers.utils.parseEther("1"))
        : ethers.FixedNumber.from(10 ** decimals1);
    amountInWithFee = amountInWithFee.mulUnsafe(Decimals0);
    let numerator: ethers.FixedNumber = amountInWithFee.mulUnsafe(
      ethers.FixedNumber.from(reserveOut)
    );
    let denominator = ethers.FixedNumber.from(reserveIn)
      .mulUnsafe(ethers.FixedNumber.from(10000))
      .addUnsafe(amountInWithFee);
    let amountOut = numerator.divUnsafe(denominator).divUnsafe(Decimals1);
    return amountOut;
  };

  const swapTokens = async () => {
    if (
      account &&
      library &&
      formContext.form.field1.value &&
      ethers.FixedNumber.from(formContext.form.field1.value) >
        ethers.FixedNumber.from(0)
    ) {
      let amountToSwap =
        formContext.form.field1.coin.decimals === 18
          ? ethers.utils.parseEther(formContext.form.field1.value)
          : ethers.FixedNumber.from(formContext.form.field1.value).mulUnsafe(
              ethers.FixedNumber.from(
                10 ** formContext.form.field1.coin.decimals
              )
            );
      if (formContext.form.field1.coin.address === coins[2].address) {
        let tx = await routerContract.swapExactETHForTokens(
          1,
          path,
          account,
          Date.now() + 60 * 20,
          {
            value: ethers.utils.parseUnits(amountToSwap.toString(), "wei"),
          }
        );
        await tx.wait();
      } else if (formContext.form.field2.coin.address === coins[2].address) {
        let tokenContract = new ethers.Contract(
          formContext.form.field1.coin.address,
          ERC20_ABI,
          library.getSigner()
        );

        let tx = await tokenContract.approve(
          routerContract.address,
          ethers.utils.parseUnits(amountToSwap.toString(), "wei")
        );
        await tx.wait();
        tx = await routerContract.swapExactTokensForETH(
          ethers.utils.parseUnits(amountToSwap.toString(), "wei"),
          1,
          path,
          account,
          Date.now() + 60 * 20
        );
        await tx.wait();
      } else {
        let tokenContract = new ethers.Contract(
          formContext.form.field1.coin.address,
          ERC20_ABI,
          library.getSigner()
        );

        let tx = await tokenContract.approve(
          routerContract.address,
          ethers.utils.parseUnits(amountToSwap.toString(), "wei")
        );
        await tx.wait();
        tx = await routerContract.swapExactTokensForTokens(
          ethers.utils.parseUnits(amountToSwap.toString(), "wei"),
          1,
          path,
          account,
          Date.now() + 60 * 20
        );
        await tx.wait();
      }
      await getPair(factoryContract, library.getSigner());
    }
  };

  const setValue = (
    val: string,
    field: Field,
    decimals0: number,
    decimals1: number,
    decimals2: number = 0
  ) => {
    let index: number = val.indexOf(".");
    let check: boolean = index >= 0 ? val.length - index < 20 : true;
    if (
      val !== "" &&
      check &&
      ethers.FixedNumber.from(val) > ethers.FixedNumber.from(0)
    ) {
      let val0 = val;
      if (index !== -1) val = val.substring(0, index + 5);
      let reserveIn = reserve0,
        reserveOut = reserve1,
        val1: any;
      if (decimals2 === 0) {
        if (
          formContext.form.field1.coin.address.toLocaleLowerCase() >
          formContext.form.field2.coin.address.toLocaleLowerCase()
        ) {
          if (parseInt(field) === 1) {
            reserveIn = reserve1;
            reserveOut = reserve0;
          }
        } else {
          if (parseInt(field) === 2) {
            reserveIn = reserve1;
            reserveOut = reserve0;
          }
        }
        val1 = amountCalc(
          ethers.FixedNumber.from(val),
          reserveIn,
          reserveOut,
          parseInt(field) === 1 ? decimals0 : decimals1,
          parseInt(field) === 1 ? decimals1 : decimals0
        );
        setVal(
          val0,
          field,
          val1.toString().substring(0, val1.toString().indexOf(".") + 5)
        );
      } else {
        val1 = amountCalc(
          ethers.FixedNumber.from(val),
          reserveIn,
          reserveOut,
          decimals0,
          decimals2
        );
        if (
          formContext.form.field1.coin.address.toLocaleLowerCase() >
            coins[0].address.toLocaleLowerCase() &&
          parseInt(field) === 1
        ) {
          reserveIn = reserve1;
          reserveOut = reserve0;
          val1 = amountCalc(
            ethers.FixedNumber.from(val),
            reserveIn,
            reserveOut,
            decimals0,
            decimals2
          );
        } else if (parseInt(field) === 2) {
          reserveIn = reserve2;
          reserveOut = reserve3;
          if (
            formContext.form.field2.coin.address.toLocaleLowerCase() >
            coins[0].address.toLocaleLowerCase()
          ) {
            reserveIn = reserve3;
            reserveOut = reserve2;
          }
          val1 = amountCalc(
            ethers.FixedNumber.from(val),
            reserveIn,
            reserveOut,
            decimals1,
            decimals0
          );
        }
        reserveIn = reserve2;
        reserveOut = reserve3;
        val1 =
          parseInt(val1.toString()) >= 1
            ? ethers.FixedNumber.from(parseInt(val1.toString()))
            : val1;
        if (
          coins[0].address.toLocaleLowerCase() >
            formContext.form.field2.coin.address.toLocaleLowerCase() &&
          parseInt(field) === 1
        ) {
          reserveIn = reserve3;
          reserveOut = reserve2;
        } else if (parseInt(field) === 2) {
          (reserveIn = reserve0), (reserveOut = reserve1);
          if (
            coins[0].address.toLocaleLowerCase() >
            formContext.form.field1.coin.address.toLocaleLowerCase()
          ) {
            reserveIn = reserve1;
            reserveOut = reserve0;
          }
        }
        val1 = amountCalc(
          val1,
          reserveIn,
          reserveOut,
          decimals2,
          parseInt(field) === 1 ? decimals1 : decimals0
        );
        setVal(
          val0,
          field,
          val1.toString().substring(0, val1.toString().indexOf(".") + 5)
        );
      }
    } else {
      setVal(val, field, "0");
    }
  };

  useEffect(() => {
    setCoin({ ...coins[0], index: 0 }, "1");
    setCoin({ ...coins[1], index: 1 }, "2");
  }, []);

  React.useEffect(() => {
    if (account) {
      setReserves();
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
          <Title>Trade with Bedrock Finance</Title>
        </SectionMargin>
        <SectionMargin style={{ zIndex: 4 }}>
          <SwapForm onSubmit={(e) => e.preventDefault()}>
            <InputFieldsContainer>
              <div>
                <Select
                  field="1"
                  coins={coins}
                  defaultIndex={0}
                  onSelection={(e) => {
                    if (
                      e.selection.address ===
                      formContext.form.field2.coin.address
                    ) {
                      swap();
                    } else {
                      setCoin(e.selection, "1");
                    }
                  }}
                ></Select>
                <InputField
                  readonly={account == null}
                  type={"number"}
                  value={formContext.form.field1.value}
                  onChange={(val) => {
                    if (reserve2 > ethers.BigNumber.from(0)) {
                      setValue(
                        val,
                        "1",
                        formContext.form.field1.coin.decimals,
                        formContext.form.field2.coin.decimals,
                        coins[0].decimals
                      );
                    } else {
                      setValue(
                        val,
                        "1",
                        formContext.form.field1.coin.decimals,
                        formContext.form.field2.coin.decimals
                      );
                    }
                  }}
                />
              </div>
              <SwapButton
                onPress={() => {
                  swap();
                }}
              ></SwapButton>
              <div>
                <Select
                  field="2"
                  coins={coins}
                  defaultIndex={1}
                  onSelection={(e) => {
                    if (
                      e.selection.address ===
                      formContext.form.field1.coin.address
                    ) {
                      swap();
                    } else {
                      setCoin(e.selection, "2");
                    }
                  }}
                ></Select>
                <InputField
                  readonly={account == null}
                  type={"number"}
                  value={formContext.form.field2.value}
                  onChange={(val) => {
                    if (reserve2 > ethers.BigNumber.from(0)) {
                      setValue(
                        val,
                        "2",
                        formContext.form.field1.coin.decimals,
                        formContext.form.field2.coin.decimals,
                        coins[0].decimals
                      );
                    } else {
                      setValue(
                        val,
                        "2",
                        formContext.form.field1.coin.decimals,
                        formContext.form.field2.coin.decimals
                      );
                    }
                  }}
                />
              </div>
              <SubmitButtonContainer>
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
              </SubmitButtonContainer>
            </InputFieldsContainer>
            {formContext.form.field1.value !== "" &&
              formContext.form.field2.value !== "" &&
              formContext.form.field1.value.length -
                formContext.form.field1.value.indexOf(".") <
                20 &&
              formContext.form.field2.value.length -
                formContext.form.field2.value.indexOf(".") <
                20 &&
              ethers.FixedNumber.from(formContext.form.field2.value) >
                ethers.FixedNumber.from(0) && (
                <span>
                  Price $
                  {parseFloat(
                    ethers.FixedNumber.from(formContext.form.field1.value)
                      .divUnsafe(
                        ethers.FixedNumber.from(formContext.form.field2.value)
                      )
                      .toString()
                  )}{" "}
                  {formContext.form.field1.coin.symbol} per{" "}
                  {formContext.form.field2.coin.symbol}
                </span>
              )}
          </SwapForm>
        </SectionMargin>
      </ContentContainer>
      <Footer />
    </div>
  );
};
