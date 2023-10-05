import { Wallet } from "@/concepts/Wallets/types";

export type Category = CategorySubmitData & {
  id: string;
};

export type CategorySubmitData = Omit<CategoryFormData, "walletId"> & {
  wallet: Wallet;
};

export type CategoryFormData = {
  name: string;
  type: string;
  icon?: string;
  color?: string;
  walletId?: string;
};

export type CategoriesState = Array<Category>;
