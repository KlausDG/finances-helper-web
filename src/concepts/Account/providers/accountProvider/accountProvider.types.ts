import { User as FirebaseUser } from "firebase/auth";
import { Account } from "../../entities";

export type AccountContextType = AccountContextReturn | undefined;

export type AuthenticatedUserType = FirebaseUser | null;
export type AccountInfoType = Account;

type AccountContextReturn = {
  accountInfo: AccountInfoType;
  handleAccountInfo: (accountInfo: AccountInfoType) => void;
  handleAccountPercentageUpdate: (walletPercentage: number) => Promise<void>;
};
