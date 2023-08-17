import { WithChildren } from "@/types";
import { CategorySubmitData } from "../../types";

export type CategoryRowItemProps = WithChildren & {
  category: CategorySubmitData;
};
