import { useMemo, useState } from "react";
import { createWallet } from "../../repository";
import toast from "react-hot-toast";
import { useAccount } from "@/concepts/Account";
import { useLoading } from "@/providers";

type WalletType = {
  name: string;
  percentage: string;
};

export const useCreateWalletForm = () => {
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    percentage: "",
  });
  const { startLoading, stopLoading } = useLoading();

  const { accountInfo, handleAccountPercentageUpdate } = useAccount();

  const remainingAccountPercentage = useMemo(() => {
    const currentPercentage = Number(accountInfo.totalPercentage.value);

    return 100 - currentPercentage;
  }, [accountInfo]);

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
      await createWallet({ ...wallet, userId: accountInfo.userId });
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
    currentAccountPercentage: accountInfo.totalPercentage.value,
  };
};
