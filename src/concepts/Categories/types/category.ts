export type Category = CategoryFormData & {
  id: string;
};

export type CategoryFormData = {
  name: string;
  type: string;
  icon?: string;
  color?: string;
  walletId?: string;
};

export type CategoriesState = Array<Category>;
