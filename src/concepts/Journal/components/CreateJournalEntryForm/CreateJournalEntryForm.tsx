import { DatePicker } from "@/components";
import { categoriesSelector } from "@/concepts/Categories";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useCreateJournalEntry } from "../../providers";
import { Controller } from "react-hook-form";

export const CreateJournalEntryForm = () => {
  const categories = useSelector(categoriesSelector);
  const { register, control, handleSubmit } = useCreateJournalEntry();

  return (
    <div className="flex flex-col gap-4">
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} />
      </FormControl>
      <div className="flex gap-4 items-end">
        <FormControl>
          <FormLabel>Valor</FormLabel>
          <Input {...register("amount")} />
        </FormControl>
        <FormControl>
          <FormLabel>Data</FormLabel>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                dateFormat="dd/MM/yyyy"
                value={field.value?.toLocaleDateString("pt-BR")}
              />
            )}
          />
        </FormControl>
      </div>
      <FormControl>
        <FormLabel as="p">Categoria</FormLabel>
        <Select placeholder="Select option" {...register("categoryId")}>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel as="p">Comentários</FormLabel>
        <Textarea
          {...register("comment")}
          placeholder="Adicione aqui comentários sobre a despesa"
          size="sm"
        />
      </FormControl>
      <div className="mt-4 m-auto">
        <Button colorScheme="green" onClick={handleSubmit} isLoading={false}>
          Adicionar
        </Button>
      </div>
    </div>
  );
};
