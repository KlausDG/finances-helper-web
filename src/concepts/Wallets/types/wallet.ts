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

export type CurrentWalletsState = Array<CurrentWalletsItem>;

export type CurrentWalletsItem = Wallet & {
  totalValue: number;
  currentValue: number;
  currentUsedPercentage: string;
};
