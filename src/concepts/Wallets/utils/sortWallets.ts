import { Wallet } from "..";

export const sortWallets = (
  walletsArray: Array<Wallet>,
  keyToSort: keyof Omit<Wallet, "lastUpdated">
) => {
  const sortedWallets = [...walletsArray];

  sortedWallets.sort((a, b) => parseInt(b[keyToSort]) - parseInt(a[keyToSort]));

  return sortedWallets;
};
