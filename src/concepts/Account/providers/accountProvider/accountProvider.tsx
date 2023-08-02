import { createContext, useEffect, useState } from "react";
import { WithChildren } from "@/types";
import { AccountContextType, AccountInfoType } from "./accountProvider.types";
import { updateAccountPercentage } from "../../repository";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { useLoading } from "@/providers";
import { db } from "@/services/firebase";

export const AccountContext = createContext<AccountContextType>(undefined);

export const AccountProvider = ({ children }: WithChildren) => {
  const [accountInfo, setAccountInfo] = useState<AccountInfoType>(
    {} as AccountInfoType
  );

  const { startLoading, stopLoading } = useLoading();

  const handleAccountInfo = (accountInfo: AccountInfoType) => {
    setAccountInfo(accountInfo);
  };

  const handleAccountPercentageUpdate = async (walletPercentage: number) => {
    const formattedPercentage = accountInfo
      ? Number(accountInfo?.totalPercentage?.value) + Number(walletPercentage)
      : Number(walletPercentage);

    updateAccountPercentage(formattedPercentage, "KlausGalm");
  };

  useEffect(() => {
    const q = query(
      collection(db, "account-info"),
      limit(1)
      //  where('owner', '==', currentUserId),
    );

    startLoading();
    const unsub = onSnapshot(q, (querySnapshot) => {
      setAccountInfo(
        (querySnapshot.docs[0].data() as unknown as AccountInfoType) ||
          ({} as AccountInfoType)
      );
      stopLoading();
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

  const value = {
    accountInfo,
    handleAccountInfo,
    handleAccountPercentageUpdate,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
