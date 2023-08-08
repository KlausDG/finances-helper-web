import { FieldValue } from "firebase/firestore";

export type Wallet = WalletProps & {
  id: string;
};

export type WalletProps = {
  name: string;
  percentage: string;
  userId: string;
  lastUpdated: FieldValue;
};

export type WalletsState = Array<Wallet>;
