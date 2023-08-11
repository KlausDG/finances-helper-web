import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CategoryFormData } from "../../types";
import { Wallet } from "@/concepts/Wallets/types";

export type CategoryFormContextType = CategoryFormContextReturn | undefined;

type CategoryFormContextReturn = {
  register: UseFormRegister<CategoryFormData>;
  setValue: UseFormSetValue<CategoryFormData>;
  watch: UseFormWatch<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  wallets: Array<Wallet>;
  handleCloseFormModal: () => void;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  isOpen: boolean;
  openModal: () => void;
  isLoading: boolean;
};
