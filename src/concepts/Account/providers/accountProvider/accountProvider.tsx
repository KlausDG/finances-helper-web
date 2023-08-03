import { createContext, useEffect } from "react";
import { WithChildren } from "@/types";
import { AccountContextType } from "./accountProvider.types";
import { updateAccountPercentage } from "../../repository";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useLoading } from "@/providers";
import { db } from "@/services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "@/concepts/Auth";
import { accountSelector, setAccount } from "../../store";

export const AccountContext = createContext<AccountContextType>(undefined);

export const AccountProvider = ({ children }: WithChildren) => {
  const { user } = useSelector(authSelector);
  const account = useSelector(accountSelector);

  const dispatch = useDispatch();

  // const [accountInfo, setAccountInfo] = useState<AccountInfoType>(
  //   {} as AccountInfoType
  // );

  const { startLoading, stopLoading } = useLoading();

  const handleAccountPercentageUpdate = async (walletPercentage: number) => {
    const formattedPercentage = account
      ? Number(account?.totalPercentage?.value) + Number(walletPercentage)
      : Number(walletPercentage);

    updateAccountPercentage(formattedPercentage, "KlausGalm");
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "account-info"),
        where("userId", "==", user?.uid)
      );

      startLoading();
      const unsub = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.docs[0]) {
          const payload = querySnapshot.docs[0].data();
          console.log(payload);

          dispatch(setAccount(payload));
          // setAccountInfo(
          //   (querySnapshot.docs[0].data() as unknown as AccountInfoType) ||
          //     ({} as AccountInfoType)
          // );
        }
        stopLoading();
      });
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
