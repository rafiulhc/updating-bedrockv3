import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected } from "../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { connect } from "mongoose";

declare global {
  interface windows {
    ethereum: any;
  }
}
export const TimerContext = React.createContext(null);

export const TimerProvider = ({ children }) => {
    const [dripTime, setDripTime] = useState(null);
    useEffect(() => {
        setDripTime(null);
        }, []);
    useEffect(() => {
        let myInterval: NodeJS.Timer | null = null;
        if (dripTime) {
          const timer = () => {
            setDripTime((n) => n - 1);
          };
          myInterval = setInterval(timer, 1000);
        }
        return () => {
          clearInterval(myInterval);
        };
      }, [dripTime]);


  return (
    <TimerContext.Provider value={[dripTime, setDripTime]}>
      {children}
    </TimerContext.Provider>
  );
};
export default function useTimer() {
  const context = React.useContext(TimerContext);

  if (context === undefined) {
    throw new Error(
      "useTimer custom error"
    );
  }

  return context;
}