import React from "react";
import { coins } from "../view/_BL";
import { Coin } from "../view/_typings";

export interface CoinSelection extends Coin {
  index: number;
}

interface Field {
  coin: CoinSelection;
  value: string;
}

export interface IFormContextValue {
  form: {
    field1: Field;
    field2: Field;
  };
}
export interface IFormContext extends IFormContextValue {
  setForm: (val: IFormContextValue) => void;
}

export const FormContext = React.createContext<IFormContext>({
  form: {
    field1: {
      coin: { ...coins[0], index: 0 },
      value: "",
    },
    field2: {
      coin: { ...coins[1], index: 1 },
      value: "",
    },
  },
  setForm: () => {},
});
