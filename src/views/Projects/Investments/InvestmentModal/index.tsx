import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import FundBtn from "./FundBtn";
import FundInput from "./FundInput";
import InvestModal from "./InvestModal";
import BigNumber from "bignumber.js";
import InvestProperty from "./InvestProperty";
import {
  useBedrockProjectContract,
  useBusdContract,
} from "../../../../hooks/useContract";
import useMetaMask from "../../../../hooks/useMetaMask";

function InvestmentModal(props) {
  const { contract } = props;
  console.log("moih: ", contract);
  

  const [raiseFunds, setRaiseFunds] = useState(0);
  const busdContract = useBusdContract();
  const {account,library}=useMetaMask();

  



  const fundsRaising = async (amount: number) => {
    if (!amount || amount <= 0) {
      return;
    }

    try {
      

      const busdAllowance = await busdContract.allowance(
        // account,
        "0x47d2bdb724c427745ac4f3ceaf3e6c23ecac85e8",
        contract.address
      );


      const expectedBusdAllowance = new BigNumber(amount * 10 ** 18).toFixed();

      if (busdAllowance < expectedBusdAllowance) {
        

        const tx = await busdContract.approve(
          contract.address,
          expectedBusdAllowance
        );

        await tx.wait();
      }



      await contract.invest(expectedBusdAllowance).then(async (data2) => {
        await data2.wait();
        window.location.href = "/projects";
      });
    } catch (error: any) {

      console.log(error);
    }
  };

  return (
    <>
      <InvestModal {...props}>
        <Modal.Header closeButton closeVariant="white">
          Invest
        </Modal.Header>
        <InvestProperty>
          <FundInput
            placeholder="Amount"
            type="number"
            onChange={(e) => setRaiseFunds(e.target.valueAsNumber)}
          />
          <FundBtn onClick={() => fundsRaising(raiseFunds)}>Fund</FundBtn>
        </InvestProperty>
      </InvestModal>
    </>
  );
}

export default InvestmentModal;
