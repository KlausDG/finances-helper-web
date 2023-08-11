import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { NameSectionProps } from "./NameSection.types";

export const NameSection = ({ error, register }: NameSectionProps) => {
  return (
    <div className="flex flex-col flex-1 gap-1">
      <FormControl isRequired>
        <FormLabel>Nome da categoria</FormLabel>
        <Input {...register("name")} isRequired />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};
