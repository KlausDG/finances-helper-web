import { CategoryFormData } from "@/concepts/Categories/types";
import { UseFormSetValue } from "react-hook-form";

export type ColorSectionProps = {
  color?: string;
  selectColor: UseFormSetValue<CategoryFormData>;
};
