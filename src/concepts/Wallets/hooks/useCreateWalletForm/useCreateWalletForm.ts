import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FieldValue } from "firebase/firestore";

import { accountSelector, useAccount } from "@/concepts/Account";
import { useLoading } from "@/providers";
import { createWallet } from "../../repository";
import { Wallet } from "../../types";

const defaulWalletValues = {
  id: "",
  name: "",
  percentage: 0,
  userId: "",
  lastUpdated: {} as FieldValue,
};

export const useCreateWalletForm = () => {
  const [wallet, setWallet] = useState<Wallet>(defaulWalletValues);

  const account = useSelector(accountSelector);

  const { startLoading, stopLoading } = useLoading();

  const { handleAccountPercentageUpdate } = useAccount();

  const remainingAccountPercentage = useMemo(() => {
    const currentPercentage = account.totalPercentage.value;

    return 100 - currentPercentage;
  }, [account]);

  const resetWallet = () => {
    setWallet(defaulWalletValues);
  };

  const handleNameInputChange = (value: string) => {
    setWallet((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handlePercentageInputChange = (value: number) => {
    const validatedValue =
      value > remainingAccountPercentage ? remainingAccountPercentage : value;

    setWallet((prev) => {
      return {
        ...prev,
        percentage: validatedValue,
      };
    });
  };

  const handleWallet = async (closeModal: () => void) => {
    startLoading();

    try {
      await createWallet({ ...wallet, userId: account.userId });
      handleAccountPercentageUpdate(wallet);

      toast.success("Carteira criada com sucesso!");
    } catch (error) {
      toast.error("Ops... something went wrong!");
    } finally {
      setWallet(defaulWalletValues);
      stopLoading();
      closeModal();
    }
  };

  return {
    resetWallet,
    handleNameInputChange,
    handlePercentageInputChange,
    wallet,
    handleWallet,
    remainingAccountPercentage,
    currentAccountPercentage: account.totalPercentage.value,
  };
};
