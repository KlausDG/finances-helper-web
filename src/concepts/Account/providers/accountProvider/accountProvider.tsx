import { createContext, useEffect } from "react";
import { WithChildren } from "@/types";
import { AccountContextType } from "./accountProvider.types";
import { getAccountSnapshot, updateAccountPercentage } from "../../repository";
import { useLoading } from "@/providers";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "@/concepts/Auth";
import { walletsSelector } from "@/concepts/Wallets";
import { Wallet } from "@/concepts/Wallets/types";

export const AccountContext = createContext<AccountContextType>(undefined);

export const AccountProvider = ({ children }: WithChildren) => {
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);

  const { startLoading, stopLoading } = useLoading();

  const extractObjectById = (idToFind: string, wallets: Array<Wallet>) => {
    const index = wallets.findIndex((wallet) => wallet.id === idToFind);
    if (index !== -1) {
      wallets.splice(index, 1);
      return wallets;
    }
    return wallets;
  };

  const handleAccountPercentageUpdate = (modifiedWallet: Wallet) => {
    const walletsCopy = [...wallets];
    const filteredWalletsArray = extractObjectById(
      modifiedWallet.id,
      walletsCopy
    );
    const arrayToSum = [...filteredWalletsArray, modifiedWallet];

    const totalPercentage = arrayToSum.reduce(
      (acc, wallet) => (acc += Number(wallet.percentage)),
      0
    );

    if (user && user.email) {
      updateAccountPercentage(totalPercentage, user.email);
    }
  };

  useEffect(() => {
    if (user) {
      startLoading();

      const unsub = getAccountSnapshot(user.uid, dispatch, stopLoading);

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  const value = {
    handleAccountPercentageUpdate,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
