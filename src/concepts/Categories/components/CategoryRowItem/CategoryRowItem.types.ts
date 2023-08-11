import { Category } from "../../types";

export type CategoryRowItemProps = {
  category: Category & {
    wallet: string;
  };
};
