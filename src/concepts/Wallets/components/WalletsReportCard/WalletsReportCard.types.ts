import { Wallet } from "../../types";

export type FormattedWalletState = Array<
  Wallet & {
    totalValue: number;
    currentValue: number;
    currentUsedPercentage: string;
  }
>;
