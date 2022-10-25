import React, { useEffect, useState } from "react";
import Tr from "../Tr";
import Td from "../Td";
import {
  useBedrockProjectContract,
  useBusdContract,
} from "../../../../hooks/useContract";
import useMetaMask from "../../../../hooks/useMetaMask";
import Button from "../../../../components/Button";
import bin from '../../../../assets/images/bin.png'
import { getProviderOrSigner } from "../../../../utils";
import InvestModal from "../InvestmentModal/InvestModal";
import InvestmentModal from "../InvestmentModal";
import Image from "next/image";

function HandleRow(props:any) {
  const { account,library } = useMetaMask();

  const [showInvestModal, setShowInvestModal] = useState(false);

  const [totalInvestments, setTotalInvestments] = useState(0);
  const [investmentContract, setInvestmentContract] = useState("");





  const { project } = props;

  const projectContract = useBedrockProjectContract(project?.contract);

  const [inv, setInv] = useState(null);

  useEffect(() => {
    const getMyInvest = async () => {
        console.log("fcd: ",projectContract);
        
      const myInvestment = await projectContract?.investments(
        // account
'0x47d2bdb724c427745ac4f3ceaf3e6c23ecac85e8'
      );

      


      const myInv =
        parseInt(myInvestment && myInvestment.toString()) / 10 ** 18;
        console.log('ibv: ',myInv);
        

      setInv(myInv);
    };
    getMyInvest();
  }, []);


  const openInvestmentModal = (con) => {
    console.log("opmodal add: ",con);
    
    setInvestmentContract(con);
    setShowInvestModal(true);
  };


  const PullInvestment = async (contract) => {
    let signer=getProviderOrSigner(library,account);
    

    try {

      const sign=contract.connect(signer);
      
      await sign.pullInvestments().then(async (data2) => {

        await data2.wait()
      })
    } catch (error: any) {
      console.log(error)
    }
  }




  return (
    <>
      
     {
        inv>0 &&  <Tr>
        <Td>{project.title}</Td>
        <Td>{inv} Busd</Td>
        <Td>
          <Button
            width="120px"
            position="static"
            outline
            onClick={() => openInvestmentModal(projectContract)}
          >
            Invest More
          </Button>
          <Button
            onClick={() => PullInvestment(projectContract)}
            width="60px"
            position="static"
            outline
          >
            <Image src={bin} />
          </Button>
        </Td>
      </Tr>
     }



{showInvestModal && (
        <InvestmentModal
          show={showInvestModal}
          onHide={() => setShowInvestModal(false)}
          contract={projectContract}
        />
      )}
    </>
  );
}

export default HandleRow;
