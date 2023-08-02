import { useContext } from "react";
import { AccountContext } from "./accountProvider";

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountProvider");
  }

  return context;
};
