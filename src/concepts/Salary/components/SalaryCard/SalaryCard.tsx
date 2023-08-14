import { getMonthPtBR } from "@/utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useCreateSalary } from "../../hooks";

export const SalaryCard = () => {
  const { handleSubmit, isLoading, register } = useCreateSalary();

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Salário</Heading>
      </CardHeader>
      <CardBody>
        <div className="flex items-end gap-4">
          <FormControl>
            <FormLabel>Adicionar salário de {getMonthPtBR()}</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1rem"
                children="R$"
              />
              <Input {...register("salary")} isRequired type="number" />
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Adicionar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
