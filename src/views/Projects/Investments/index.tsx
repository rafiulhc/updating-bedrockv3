// import React, { useEffect, useLayoutEffect, useState,useRef } from "react";
// import SectionHeading from "../../../components/SectionHeading";
// import InvestmentHeader from "./InvestmentHeader";
// import InvestmentWrapper from "./InvestmentWrapper";
// import InvestTag from "./InvestTag";
// import TableWrapper from "./TableWrapper";
// import Total from "./Total";
// import Tr from "./Tr";
// import Table from "./Table";
// import Th from "./Th";
// import Td from "./Td";
// import bin from "../../../assets/images/bin.png";
// import Button from "../../../components/Button";
// import Image from "next/image";
// import Desclaimer from "./Desclaimer";
// import Paragraph from "../../../components/Paragraph";
// import Thead from "./Thead";
// import Tbody from "./Tbody";
// import useWindowSize from "../../../hooks/useWindowSize";
// import InvestmentModal from "./InvestmentModal";
// import {
//   useBedrockProjectContract,
//   useBusdContract,
// } from "../../../hooks/useContract";
// import { getProviderOrSigner } from '../../../utils'

// import ImageBackground from "../../HomePage/Hero/HeroBanner/ImageBackground";
// import useMetaMask from "../../../hooks/useMetaMask";

// function Investments(props: any) {
//   const [investments, setInvestments] = useState([]);
//   const { width } = useWindowSize();
// const [projectContract,setProjct]=useState([])
//   const [showInvestModal, setShowInvestModal] = useState(false);
//   const firstRender = useRef(false);
// const [rend,setRend]=useState(false)
//   const [totalInvestments, setTotalInvestments] = useState(0);
//   const [investmentContract, setInvestmentContract] = useState("");
  
//   const {library,account}=useMetaMask()
//   const busdContract = useBusdContract();
//   const [pullContract,setPullContract]=useState('');
//   const [render,setRender]=useState(false);
  
//   const ourInvestments=[];
//   // const projectContract=[];

//   const { data } = props;

//   data.length > 0 &&
//   data.forEach((element,index) => {
//     console.log("ele: ",element);
//     console.log("idxx: ",projectContract);

      
//           projectContract.push({
//             title: element.title,
//             contract: useBedrockProjectContract(element.contract),
//             projectContract:element.contract,
//             _id: element._id,
//           });
         
        



  
//   });


  




//   useEffect(() => {



//     const getMyInvestments = async () => {
//       console.log("pro cont array: ",projectContract.length);

//       projectContract.length > 0 &&
//         projectContract.forEach(async (contract) => {
          
//           const myInvestment = await contract?.contract?.investments(
//           //  account
//            "0x47d2bdb724c427745ac4f3ceaf3e6c23ecac85e8"
//           );

//           console.log(" my inv",myInvestment);
          

//           const inv =
//             parseInt(myInvestment && myInvestment.toString()) / 10 ** 18;
//           var item = ourInvestments.find((item) => item._id === contract._id);
            
//           console.log(" my i",item);

//           if (
//             item?._id !== contract._id
//              &&
//             inv !== 0 
//             &&
//             contract.title !== null
//           ) {

//             // setRend(!rend);
//             ourInvestments.push({
//               title: contract.title,
//               investment: inv,
//               _id: contract._id,
//               contract: contract.contract,
//               projectContract:contract.projectContract
//             });
           
//           }

          

          
//         });
// let addInv=0;

      
//     };


//       getMyInvestments();

    
//   }, [ourInvestments,account,library,projectContract,width]);


//   console.log("our: ",ourInvestments);
  


//   const openInvestmentModal = (con) => {
//     setInvestmentContract(con);
//     setShowInvestModal(true);
//   };


//   const PullInvestment = async (contract) => {
//     let signer=getProviderOrSigner(library,account);
    

//     try {

//       const sign=contract.connect(signer);
      
//       await sign.pullInvestments().then(async (data2) => {

//         await data2.wait()
//       })
//     } catch (error: any) {
//       console.log(error)
//     }
//   }


// useEffect(()=>{

// },[ourInvestments])


//   return (
//     <>
//       {width > 786 && (
//         <>
//           <ImageBackground
//             Width="20%"
//             height="60%"
//             background="#893242 "
//             top="470%"
//             right="0%"
//           />
//           <ImageBackground
//             Width="15%"
//             height="50%"
//             background="#893242 "
//             top="450%"
//           />
//         </>
//       )}
//       <InvestmentWrapper>
//         <InvestmentHeader>
//           <SectionHeading>My Investments</SectionHeading>
//           <Total>
//             <InvestTag>Total Investments</InvestTag>
//             {totalInvestments} Busd
//           </Total>
//         </InvestmentHeader>
//         <TableWrapper>
//           <Table >
//             <Thead>
//               <Tr>
//                 <Th>
//                   <InvestTag>Project</InvestTag>
//                 </Th>
//                 <Th>
//                   <InvestTag>Total Investments</InvestTag>
//                 </Th>

//                 <Th>
//                   <InvestTag>Action</InvestTag>
//                 </Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {ourInvestments.length > 0 &&
//                 ourInvestments.map((inv, index) => {
//                   return (
//                     <Tr key={index}>
//                       <Td>{inv.title}</Td>
//                       <Td>{inv.investment} Busd</Td>
//                       <Td>
//                         <Button
//                           width="120px"
//                           position="static"
//                           outline
//                           onClick={() => openInvestmentModal(inv.contract)}
//                         >
//                           Invest More
//                         </Button>
//                         <Button onClick={()=>PullInvestment(inv.contract)} width="60px" position="static" outline>
//                           <Image src={bin} />
//                         </Button>
//                       </Td>
//                     </Tr>
//                   );
//                 })}
//             </Tbody>
//           </Table>
//         </TableWrapper>
//         <Desclaimer>
//           <Paragraph>
//             Sed ut perspiciatis unde omnis iste natus error sit volup tatem
//             accus antium doloremque laud antium, totam rem a periam. Neque porro
//             quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
//             adipisci velit,
//           </Paragraph>
//           <Button width={width <= 480 && "200px"} outline position="static">
//             Desclaimer
//           </Button>
//         </Desclaimer>
//       </InvestmentWrapper>

//       {showInvestModal && (
//         <InvestmentModal
//           show={showInvestModal}
//           onHide={() => setShowInvestModal(false)}
//           contract={investmentContract}
//         />
//       )}
//     </>
//   );
// }

// export default Investments;






import React, { useEffect, useLayoutEffect, useState,useRef } from "react";
import SectionHeading from "../../../components/SectionHeading";
import InvestmentHeader from "./InvestmentHeader";
import InvestmentWrapper from "./InvestmentWrapper";
import InvestTag from "./InvestTag";
import TableWrapper from "./TableWrapper";
import Total from "./Total";
import Tr from "./Tr";
import Table from "./Table";
import Th from "./Th";
import Td from "./Td";
import bin from "../../../assets/images/bin.png";
import Button from "../../../components/Button";
import Image from "next/image";
import Desclaimer from "./Desclaimer";
import Paragraph from "../../../components/Paragraph";
import Thead from "./Thead";
import Tbody from "./Tbody";
import useWindowSize from "../../../hooks/useWindowSize";
import InvestmentModal from "./InvestmentModal";
import {
  useBedrockProjectContract,
  useBusdContract,
} from "../../../hooks/useContract";
import { getProviderOrSigner } from '../../../utils'

import ImageBackground from "../../HomePage/Hero/HeroBanner/ImageBackground";
import useMetaMask from "../../../hooks/useMetaMask";
import HandleRow from "./HandleRow";

function Investments(props: any) {
  const [investments, setInvestments] = useState([]);
  
  const [showInvestModal, setShowInvestModal] = useState(false);
  const firstRender = useRef(false);

  const [totalInvestments, setTotalInvestments] = useState(0);
  const [investmentContract, setInvestmentContract] = useState("");
  
  const {library,account}=useMetaMask()
  const busdContract = useBusdContract();
  const [pullContract,setPullContract]=useState('');
  const [render,setRender]=useState(false);
    const { width } = useWindowSize();

  const ourInvestments=[];
  const projectContract=[];

  const { data } = props;

  data.length > 0 &&
  data.forEach((element,index) => {
    console.log("ele: ",element);
    console.log("idxx: ",projectContract);

      
          projectContract.push({
            title: element.title,
            contract: useBedrockProjectContract(element.contract),
            projectContract:element.contract,
            _id: element._id,
          });
         
        



  
  });


  




  useEffect(() => {



    const getMyInvestments = async () => {
      console.log("pro cont array: ",projectContract.length);

      projectContract.length > 0 &&
        projectContract.forEach(async (contract) => {
          
          const myInvestment = await contract?.contract?.investments(
           account
          );

          console.log(" my inv",myInvestment);
          

          const inv =
            parseInt(myInvestment && myInvestment.toString()) / 10 ** 18;
          var item = ourInvestments.find((item) => item._id === contract._id);
            
          console.log(" my i",item);

          if (
            item?._id !== contract._id
             &&
            inv !== 0 
            &&
            contract.title !== null
          ) {
            ourInvestments.push({
              title: contract.title,
              investment: inv,
              _id: contract._id,
              contract: contract.contract,
              projectContract:contract.projectContract
            });
           
          }

          

          
        });
let addInv=0;

      
    };


      getMyInvestments();

    
  }, [ourInvestments,account,library,projectContract]);


  console.log("our: ",ourInvestments);
  


  const openInvestmentModal = (con) => {
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
      {width > 786 && (
        <>
          <ImageBackground
            Width="20%"
            height="60%"
            background="#893242 "
            top="470%"
            right="0%"
          />
          <ImageBackground
            Width="15%"
            height="50%"
            background="#893242 "
            top="450%"
          />
        </>
      )}
      <InvestmentWrapper>
        <InvestmentHeader>
          <SectionHeading>My Investments</SectionHeading>
          <Total>
            <InvestTag>Total Investments</InvestTag>
            {totalInvestments} Busd
          </Total>
        </InvestmentHeader>
        <TableWrapper>
          <Table >
            <Thead>
              <Tr>
                <Th>
                  <InvestTag>Project</InvestTag>
                </Th>
                <Th>
                  <InvestTag>Total Investments</InvestTag>
                </Th>

                <Th>
                  <InvestTag>Action</InvestTag>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              
                 
                     {
                      data.length > 0 && data.map((project)=>{
                        return <HandleRow project={project}/>
                      })
                     }
            </Tbody>
          </Table>
        </TableWrapper>
        <Desclaimer>
          <Paragraph>
            Sed ut perspiciatis unde omnis iste natus error sit volup tatem
            accus antium doloremque laud antium, totam rem a periam. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit,
          </Paragraph>
          <Button width={width <= 480 && "200px"} outline position="static">
            Desclaimer
          </Button>
        </Desclaimer>
      </InvestmentWrapper>

      {showInvestModal && (
        <InvestmentModal
          show={showInvestModal}
          onHide={() => setShowInvestModal(false)}
          contract={investmentContract}
        />
      )}
    </>
  );
}

export default Investments;
