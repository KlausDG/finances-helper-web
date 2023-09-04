import { Wallet } from "../../types";

export type FormattedWalletState = Array<FormattedWalletItem>;

export type FormattedWalletItem = Wallet & {
  totalValue: number;
  currentValue: number;
  currentUsedPercentage: string;
};
