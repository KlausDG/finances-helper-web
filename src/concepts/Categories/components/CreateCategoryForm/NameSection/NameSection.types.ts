import { CategoryFormData } from "@/concepts/Categories/types";
import { UseFormRegister } from "react-hook-form";

export type NameSectionProps = {
  error?: string;
  register: UseFormRegister<CategoryFormData>;
};
