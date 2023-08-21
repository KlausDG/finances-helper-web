import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { accountSelector, useAccount } from "@/concepts/Account";
import { useLoading } from "@/providers";
import { updateWallet } from "../../repository";
import {
  clearSelectedWallet,
  selectWallet,
  updateSelectedWallet,
  selectedWalletSelector,
} from "../../store";
import { WalletProps } from "../../types";

export const useUpdateWalletForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    percentage: 0,
  });

  const [editablePercentageLimit, setEditablePercentageLimit] = useState(0);

  const { startLoading, stopLoading } = useLoading();

  const { handleAccountPercentageUpdate } = useAccount();

  const dispatch = useDispatch();

  const account = useSelector(accountSelector);
  const selectedWallet = useSelector(selectedWalletSelector);

  const remainingAccountPercentage = useMemo(() => {
    const currentPercentage = Number(account.totalPercentage.value);

    return 100 - currentPercentage;
  }, [account]);

  const editWallet = (wallet: WalletProps, openModal: () => void) => {
    const { name, percentage } = wallet;

    dispatch(selectWallet(wallet));
    setFormValues({ name, percentage });
    handleEditatablePercentageLimit(Number(wallet.percentage));
    openModal();
  };

  const handleEditatablePercentageLimit = (percentage: number) => {
    if (Number(account.totalPercentage) === 100) {
      setEditablePercentageLimit(percentage);
    } else {
      setEditablePercentageLimit(percentage + remainingAccountPercentage);
    }
  };

  const handleNameInputChange = (value: string) => {
    setFormValues((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handlePercentageInputChange = (value: number) => {
    const validatedValue =
      value > editablePercentageLimit ? editablePercentageLimit : value;

    setFormValues((prev) => {
      return {
        ...prev,
        percentage: validatedValue,
      };
    });
  };

  const handleUpdateWallet = async (closeModal: () => void) => {
    startLoading();
    dispatch(updateSelectedWallet(formValues));

    try {
      updateWallet({ ...selectedWallet, ...formValues });

      handleAccountPercentageUpdate({ ...selectedWallet, ...formValues });

      toast.success("Carteira editada com sucesso!");
    } catch (error) {
      toast.error("Ops... something went wrong!");
    } finally {
      dispatch(clearSelectedWallet());
      stopLoading();
      closeModal();
    }
  };

  return {
    editedWalletValues: formValues,
    editWallet,
    handleEditNameInputChange: handleNameInputChange,
    handleEditPercentageInputChange: handlePercentageInputChange,
    handleUpdateWallet,
  };
};
