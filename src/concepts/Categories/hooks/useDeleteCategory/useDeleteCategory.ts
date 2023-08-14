import { useLoading } from "@/providers";
import { deleteCategory } from "../../repository";
import { toast } from "react-hot-toast";

export const useDeleteCategory = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleDeleteCategory = (categoryId: string) => {
    startLoading();

    try {
      deleteCategory(categoryId);
      toast.success("Carteira removida com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  return {
    handleDeleteCategory,
  };
};
