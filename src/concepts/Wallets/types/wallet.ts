import { FieldValue } from "firebase/firestore";

export type Wallet = WalletProps & {
  id: string;
};

export type WalletProps = {
  name: string;
  percentage: number;
  userId: string;
  lastUpdated: FieldValue;
};

export type WalletsState = Array<Wallet>;
