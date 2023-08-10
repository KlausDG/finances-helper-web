import { Title } from "@/components";
import { Select } from "@chakra-ui/react";
import { WalletSectionProps } from "./WalletSection.types";

export const WalletSection = ({ register, wallets }: WalletSectionProps) => {
  return (
    <section className="flex flex-col gap-1 border-b px-1 py-6">
      <Title text="Selecione uma carteira" />
      <Select {...register("walletId")} placeholder=" ">
        {wallets.map((wallet) => {
          return (
            <option value={wallet.id} key={wallet.id}>
              {wallet.name} ({wallet.percentage}/100)
            </option>
          );
        })}
      </Select>
    </section>
  );
};
