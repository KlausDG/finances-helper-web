import { DatePicker } from "@/components";
import { categoriesSelector } from "@/concepts/Categories";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useCreateJournalEntry } from "../../providers";
import { Controller } from "react-hook-form";

export const CreateJournalEntryForm = () => {
  const categories = useSelector(categoriesSelector);
  const { register, control, watch, handleSubmit, toggleRebate } =
    useCreateJournalEntry();

  return (
    <div className="flex flex-col gap-4">
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input {...register("description")} />
      </FormControl>
      <div className="flex gap-4 items-end">
        <FormControl>
          <FormLabel>Valor</FormLabel>
          <Input
            {...register("amount", {
              valueAsNumber: true,
            })}
          />
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
        <Select placeholder="Escolha uma categoria" {...register("categoryId")}>
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
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="rebate" mb="0">
          Rebate?
        </FormLabel>
        <Switch
          id="rebate"
          {...register("hasRebate", {
            onChange: toggleRebate,
          })}
        />
      </FormControl>
      {watch("hasRebate") && (
        <div className="p-4 grid gap-4 bg-green-600 rounded-lg">
          <FormControl>
            <FormLabel color="gray.100">Valor</FormLabel>
            <Input
              {...register("rebateAmount", {
                valueAsNumber: true,
              })}
              size="sm"
              bg="gray.100"
              type="number"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.100">Descrição</FormLabel>
            <Input {...register("rebateDescription")} size="sm" bg="gray.100" />
          </FormControl>
        </div>
      )}
      <div className="mt-4 m-auto">
        <Button colorScheme="green" onClick={handleSubmit} isLoading={false}>
          Adicionar
        </Button>
      </div>
    </div>
  );
};
