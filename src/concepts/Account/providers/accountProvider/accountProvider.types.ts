import { Wallet } from "@/concepts/Wallets/types";
import { User as FirebaseUser } from "firebase/auth";

export type AccountContextType = AccountContextReturn | undefined;

export type AuthenticatedUserType = FirebaseUser | null;

type AccountContextReturn = {
  handleAccountPercentageUpdate: (
    modifiedWallet: Wallet,
    isDelete?: boolean
  ) => void;
};
