import { CategoriesState } from "../types";

export const categoriesSelector = (state: { categories: CategoriesState }) =>
  state.categories;
