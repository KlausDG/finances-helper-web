import { Wallet } from "..";

export const selectWalletById = (wallets: Array<Wallet>, id?: string) => {
  return wallets.find((wallet) => wallet.id === id);
};
