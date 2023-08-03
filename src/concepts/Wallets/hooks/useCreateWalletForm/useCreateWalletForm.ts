import { useMemo, useState } from "react";
import { createWallet } from "../../repository";
import toast from "react-hot-toast";
import { accountSelector, useAccount } from "@/concepts/Account";
import { useLoading } from "@/providers";
import { useSelector } from "react-redux";

type WalletType = {
  name: string;
  percentage: string;
};

export const useCreateWalletForm = () => {
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    percentage: "",
  });

  const account = useSelector(accountSelector);

  const { startLoading, stopLoading } = useLoading();

  const { handleAccountPercentageUpdate } = useAccount();

  const remainingAccountPercentage = useMemo(() => {
    const currentPercentage = Number(account.totalPercentage.value);

    return 100 - currentPercentage;
  }, [account]);

  const handleNameInputChange = (value: string) => {
    setWallet((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handlePercentageInputChange = (value: string) => {
    const validatedValue =
      Number(value) > remainingAccountPercentage
        ? remainingAccountPercentage
        : value;

    setWallet((prev) => {
      return {
        ...prev,
        percentage: validatedValue.toString(),
      };
    });
  };

  const handleCreateWallet = async (closeModal: () => void) => {
    startLoading();

    try {
      await createWallet({ ...wallet, userId: account.userId });
      await handleAccountPercentageUpdate(Number(wallet.percentage));
      toast.success("Carteira criada com sucesso!");
    } catch (error) {
      toast.error("Ops... something went wrong!");
    } finally {
      stopLoading();
      closeModal();
    }
  };

  return {
    handleNameInputChange,
    handlePercentageInputChange,
    wallet,
    handleCreateWallet,
    remainingAccountPercentage,
    currentAccountPercentage: account.totalPercentage.value,
  };
};
