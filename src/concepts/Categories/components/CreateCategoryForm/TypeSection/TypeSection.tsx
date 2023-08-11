import { Title } from "@/components";
import { Select } from "@chakra-ui/react";
import { TypeSectionProps } from "./TypeSection.types";

export const TypeSection = ({ register }: TypeSectionProps) => {
  return (
    <section className="flex flex-col gap-1 border-b px-1 py-6">
      <Title text="Tipo da categoria" />
      <Select {...register("type")}>
        <option value="expense">Despesa</option>
        <option value="income">Renda</option>
      </Select>
    </section>
  );
};
