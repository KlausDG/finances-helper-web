import { selectedWalletSelector } from "./../../store/selectedWalletSelector";
import { useMemo, useState } from "react";
import { WalletProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedWallet,
  selectWallet,
  updateSelectedWallet,
  updateWallet,
} from "../..";
import { accountSelector, useAccount } from "@/concepts/Account";
import { useLoading } from "@/providers";
import toast from "react-hot-toast";

export const useUpdateWalletForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    percentage: "",
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

  const handlePercentageInputChange = (value: string) => {
    const validatedValue =
      Number(value) > editablePercentageLimit
        ? editablePercentageLimit
        : Number(value);

    setFormValues((prev) => {
      return {
        ...prev,
        percentage: validatedValue.toString(),
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
