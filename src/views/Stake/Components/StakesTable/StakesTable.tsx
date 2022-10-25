import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import bin from "../../../../assets/images/bin.png";
import Image from 'next/image';

const StakesTableSection = styled.div`
    min-width: 100%;
    margin: 200px 0;
    padding: 0 10%;
    color: white;

    @media (max-width: 768px) {
        padding: 0 3%;
    }
`
const StakesSectionTitle = styled.h2`
    font-size: 50px;
`
const StakesTableContainer = styled.div`
    width: 100%;
    min-width: 768px;

    &>div {
        margin: 25px 0 10px 0;
    }

`
const StakesTableScrollContainer = styled.div`
    display: flex;
    justify-content: left;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        background:transparent;
        width:5px;
     };
    &::-webkit-scrollbar-thumb {
        background: #E98331;

        height:100px;
        width:5px;
        border-radius: 60px;
    };
`
const StakesTableHeader = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    color: #E98331;
    font-size: 14px;
`
const StakesTableHeaderData = styled.div`
    width: 100%;
`
const StakesTableRow = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dotted #D1735D;
`
const StakesTableData = styled.div`
    width: 100%;
`

interface Staked {
    value: number;
    coin: string;
}
export interface TableData {
    endDate: number;
    staked: Staked;
    dailyReward: number;
    rockUnclaimed: string;
    stakeId: string;
    start: number;
    daysUnclaimed: number;
    usdUnclaimed: string;
}
interface StakesTableProps extends PropsWithChildren {
    data: TableData[];
    onClaim: (index: number) => void;
    onDelete: (index: number) => void;
}
export const StakesTable: React.FC<StakesTableProps> = ({data, onClaim, onDelete}: StakesTableProps) => {

    return (
        <StakesTableSection>
            <StakesSectionTitle>Stakes Table</StakesSectionTitle>
            <StakesTableScrollContainer>
                <StakesTableContainer>
                    <StakesTableHeader>
                        <StakesTableHeaderData>End date</StakesTableHeaderData>
                        <StakesTableHeaderData>Stalked</StakesTableHeaderData>
                        <StakesTableHeaderData>Daily reward</StakesTableHeaderData>
                        <StakesTableHeaderData>Rock unclaimed</StakesTableHeaderData>
                        <StakesTableHeaderData><div style={{width: '100%', textAlign: 'center'}}>Action</div></StakesTableHeaderData>
                    </StakesTableHeader>
                    {data.map((val, index) => (
                        <StakesTableRow>
                            <StakesTableData>{new Date(val.endDate * 1000).toISOString().split('T')[0]}</StakesTableData>
                            <StakesTableData>{val.staked.value} {val.staked.coin}</StakesTableData>
                            <StakesTableData>{val.dailyReward}</StakesTableData>
                            <StakesTableData>{val.rockUnclaimed}</StakesTableData>
                            <StakesTableData>
                                <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', gap: '15px', paddingRight: '5px'}}>
                                    <Button width="100px" position="static" outline onClick={() => onClaim(index)}>Claim</Button>
                                    <Button width='60px' outline position="static"><Image src={bin} onClick={() => onDelete(index)}/></Button>
                                </div>
                            </StakesTableData>
                        </StakesTableRow>
                    ))}
                </StakesTableContainer>
            </StakesTableScrollContainer>
        </StakesTableSection>
    )
}