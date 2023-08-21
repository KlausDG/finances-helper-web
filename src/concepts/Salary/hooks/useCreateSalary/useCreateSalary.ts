import { useLoading } from "@/providers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { createSalary } from "../../repository";
import { authSelector } from "@/concepts/Auth";
import { useSelector } from "react-redux";

const schema = yup.object({
  amount: yup.string().required(),
});

const initialState = {
  amount: "",
};

export const useCreateSalary = () => {
  const { getValues, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const { loading, startLoading, stopLoading } = useLoading();

  const { user } = useSelector(authSelector);

  const handleCreateSalary = () => {
    startLoading();
    try {
      createSalary(getValues(), user!.uid);
      toast.success("Salário adicionado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro.");
    } finally {
      stopLoading();
    }
  };

  return {
    handleSubmit: handleSubmit(handleCreateSalary),
    register,
    isLoading: loading,
  };
};
