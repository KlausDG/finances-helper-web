import { CategoryFormContext } from "./categoryFormProvider";
import { useContext } from "react";

export const useCategoryForm = () => {
  const context = useContext(CategoryFormContext);

  if (context === undefined) {
    throw new Error(
      "useCategoryForm must be used within a CategoryFormProvider"
    );
  }

  return context;
};
