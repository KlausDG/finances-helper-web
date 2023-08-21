import { Wallet } from "../../types";

export type WalletCardProps = {
  wallet: Wallet;
  onEditClick: () => void;
  onRemoveClick: () => void;
};
