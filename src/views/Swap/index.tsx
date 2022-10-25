import React from "react";
import { SwapView } from "./view/SwapView";
import { FormContext, IFormContextValue } from "./contexts/FormContext";
import { coins } from "./view/_BL";

export const SwapViewContainer = () => {
  const [form, setForm] = React.useState<IFormContextValue>({
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
  });

  return (
    <FormContext.Provider value={{ form: form.form, setForm: setForm }}>
      <SwapView />
    </FormContext.Provider>
  );
};
