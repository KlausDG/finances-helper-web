import { walletsSelector } from "@/concepts/Wallets";
import { useSelector } from "react-redux";
import { createCategory } from "../../repository";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryFormData } from "../../types";
import { toast } from "react-hot-toast";
import { useLoading } from "@/providers";

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

type UseCategoryFormProps = {
  closeModal: () => void;
};

export const useCategoryForm = ({ closeModal }: UseCategoryFormProps) => {
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

  const { startLoading, stopLoading } = useLoading();

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

  return {
    errors,
    watch,
    register,
    setValue,
    getValues,
    handleCloseFormModal,
    handleCreateCategory,
    wallets,
    handleSubmit: handleSubmit(handleCreateCategory),
  };
};
