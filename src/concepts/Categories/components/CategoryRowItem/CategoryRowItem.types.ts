import { WithChildren } from "@/types";
import { Category } from "../../types";

export type CategoryRowItemProps = WithChildren & {
  category: Category & {
    wallet: string;
  };
};
