import { useState } from "react";
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

  const handleInputChange = (key: keyof WalletType, value: string) => {
    setWallet((prev) => {
      return {
        ...prev,
        [key]: value,
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
    handleInputChange,
    wallet,
    handleCreateWallet,
  };
};
