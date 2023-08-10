import { walletsSelector } from "@/concepts/Wallets";
import { useLoading } from "@/providers";
import { WithChildren } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createCategory } from "../..";
import { CategoryFormData } from "../../types";
import { useModal } from "@/hooks";
import * as yup from "yup";
import { CategoryFormContextType } from "./categoryFormProvider.types";

export const CategoryFormContext =
  createContext<CategoryFormContextType>(undefined);

const schema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  icon: yup.string(),
  color: yup.string(),
  walletId: yup.string(),
});

const initialState: CategoryFormData = {
  name: "",
  type: "expense",
  icon: "",
  color: "",
  walletId: "",
};

export const CategoryFormProvider = ({ children }: WithChildren) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: yupResolver<CategoryFormData>(schema),
    defaultValues: initialState,
  });

  const { loading, startLoading, stopLoading } = useLoading();
  const { isOpen, openModal, closeModal } = useModal();

  const wallets = useSelector(walletsSelector);

  const handleCreateCategory = () => {
    startLoading();
    try {
      createCategory(getValues());
      toast.success("Categoria criada com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro.");
    } finally {
      reset();
      stopLoading();
      closeModal();
    }
  };

  const handleCloseFormModal = () => {
    reset();
    closeModal();
  };

  const value = {
    register,
    setValue,
    watch,
    errors,
    wallets,
    handleCloseFormModal,
    handleSubmit: handleSubmit(handleCreateCategory),
    isOpen,
    openModal,
    isLoading: loading,
  };

  return (
    <CategoryFormContext.Provider value={value}>
      {children}
    </CategoryFormContext.Provider>
  );
};
