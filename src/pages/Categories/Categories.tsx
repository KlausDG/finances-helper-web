import { useCategoryForm } from "@/concepts/Categories/providers";
import { CreateCategoryModal } from "@/concepts/Categories";

export const CategoriesPage = () => {
  const { openModal } = useCategoryForm();

  return (
    <div className="grid gap-4 grid-cols-6">
      <button onClick={openModal}>Nova Categoria</button>

      <CreateCategoryModal />
    </div>
  );
};
