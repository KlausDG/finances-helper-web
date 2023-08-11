import { CategoryFormData } from "@/concepts/Categories/types";
import { Wallet } from "@/concepts/Wallets/types";
import { UseFormRegister } from "react-hook-form";

export type WalletSectionProps = {
  register: UseFormRegister<CategoryFormData>;
  wallets: Array<Wallet>;
};
