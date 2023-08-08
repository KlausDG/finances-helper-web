import { Wallet } from "../types";

export const selectedWalletSelector = (state: { selectedWallet: Wallet }) =>
  state.selectedWallet;
