import { useLoading } from "@/providers";
import { deleteWallet } from "../../repository";
import { useAccount } from "@/concepts/Account";
import { Wallet } from "../../types";

export const useDeleteWallet = () => {
  const { startLoading, stopLoading } = useLoading();

  const { handleAccountPercentageUpdate } = useAccount();

  const handleDeleteWallet = (wallet: Wallet) => {
    startLoading();

    try {
      deleteWallet(wallet.id);
      handleAccountPercentageUpdate(wallet, true);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  return {
    handleDeleteWallet,
  };
};
