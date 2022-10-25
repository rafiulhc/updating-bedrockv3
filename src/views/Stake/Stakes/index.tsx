import React, { useEffect } from "react";
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
import Thead from "./Thead";
import Tbody from "./Tbody";

function Stakes() {

  return (
    <>
      <InvestmentWrapper>
        <InvestmentHeader>
          <SectionHeading>Your Stakes</SectionHeading>
         
        </InvestmentHeader>
        <TableWrapper>
          <Table>
         <Thead>
         <Tr>
              <Th>
                <InvestTag>End date</InvestTag>
              </Th>
              <Th>
                <InvestTag>Staked</InvestTag>
              </Th>
              <Th>
                <InvestTag>Daily reward</InvestTag>
              </Th>
              <Th>
                <InvestTag>Rock unclaimed</InvestTag>
              </Th>
              <Th>
                <InvestTag>Action</InvestTag>
              </Th>
            </Tr>
         </Thead>
           <Tbody>
           <Tr>
              <Td>Solar Leads</Td>
              <Td>2.76 Rock</Td>
              <Td>20.05.2022</Td>
              <Td>0.025</Td>

              <Td>
                <Button width="100px" position="static" outline>
                  Claim
                </Button>
                <Button width="60px" position="static" outline>
                  <Image src={bin} />
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Real Earth</Td>
              <Td>2.76 Rock</Td>
              <Td>20.05.2022</Td>
              <Td>0.025</Td>

              <Td>
                <Button width="100px" position="static" outline>
                  Claim
                </Button>
                <Button width="60px" position="static" outline>
                  <Image src={bin} />
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>D`Ondre</Td>
              <Td>2.76 Rock</Td>
              <Td>14.05.2022</Td>
              <Td>0.025</Td>

              <Td>
                <Button width="100px" position="static" outline>
                  Claim
                </Button>
                <Button width="60px" position="static" outline>
                  <Image src={bin} />
                </Button>
              </Td>
            </Tr>
           </Tbody>
          </Table>
        </TableWrapper>
       
      </InvestmentWrapper>
    </>
  );
}

export default Stakes;
