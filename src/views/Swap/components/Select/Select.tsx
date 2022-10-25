import React, { MutableRefObject, RefObject } from "react";
import styled from "styled-components";
import { Coin } from "../../view/_typings";
import { useBL } from "./_bl";
import ArrowDown from "../../../../assets/images/arrowdownmodal.png";
import { CoinSelection } from "../../contexts/FormContext";
import {
  SelectButton,
  SelectOption,
  SelectOptionsContainer,
} from "./_c_exports";

const SelectContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

interface OnSelectionEventInterface {
  selection: CoinSelection;
}

interface SelectProps {
  field: "1" | "2";
  defaultIndex: number;
  coins: Coin[];
  onSelection?: (e: OnSelectionEventInterface) => void;
}
export const Select: React.FC<SelectProps> = ({
  coins,
  defaultIndex,
  onSelection,
  field,
}: SelectProps) => {
  const { menuRef, toggleMenu, hideMenu, formContext } = useBL({
    defaultSelection: coins[defaultIndex].symbol,
    selectionIndex: defaultIndex,
    field,
  });

  const handleSelect = (
    index: number,
    symbol: string,
    name: string,
    img: string,
    address: string,
    decimals: number
  ) => {
    hideMenu();
    if (onSelection)
      onSelection({
        selection: {
          name: name,
          symbol: symbol,
          img: img,
          index: index,
          address: address,
          decimals: decimals,
        },
      });
  };

  return (
    <SelectContainer>
      <SelectButton
        onClick={() => {
          toggleMenu();
        }}
      >
        <img
          src={coins[formContext.form[`field${field}`].coin.index].img}
          width="30"
          height="30"
        ></img>
        {formContext.form[`field${field}`].coin.symbol}
        <img
          src={ArrowDown.src}
          height={ArrowDown.height}
          width={ArrowDown.width}
        />
      </SelectButton>
      <SelectOptionsContainer ref={menuRef}>
        {coins.map((coin, index) => (
          <SelectOption
            key={index}
            onClick={() =>
              handleSelect(
                index,
                coin.symbol,
                coin.name,
                coin.img,
                coin.address,
                coin.decimals
              )
            }
          >
            <img src={coin.img} height="30" width="30" />
            {coin.symbol}
          </SelectOption>
        ))}
      </SelectOptionsContainer>
    </SelectContainer>
  );
};
