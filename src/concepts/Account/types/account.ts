import { FieldValue } from "firebase/firestore";

export type Account = {
  userId: string;
  userName: string;
  totalPercentage: TotalPercentage;
};

export type TotalPercentage = {
  lastUpdated: FieldValue;
  value: number;
};

export type AccountState = Account;
