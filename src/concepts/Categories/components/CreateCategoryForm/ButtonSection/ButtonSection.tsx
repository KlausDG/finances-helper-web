import { Button } from "@chakra-ui/react";
import { ButtonSectionProps } from "./ButtonSection.types";

export const ButtonSection = ({ onClick, isLoading }: ButtonSectionProps) => {
  return (
    <div className="mt-4 m-auto">
      <Button colorScheme="green" onClick={onClick} isLoading={isLoading}>
        Criar Categoria
      </Button>
    </div>
  );
};
