import { Category } from "../types";

export const selectCategoryById = (
  categories: Array<Category>,
  id?: string
) => {
  return categories.find((category) => category.id === id);
};
