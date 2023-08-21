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
import { useCreateSalary, useCurrentSalary } from "../../hooks";

export const SalaryCard = () => {
  const { handleSubmit, isLoading, register } = useCreateSalary();
  const { salary } = useCurrentSalary();

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Salário</Heading>
      </CardHeader>
      <CardBody>
        {!salary.id ? (
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
                <Input {...register("amount")} isRequired type="number" />
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
        ) : (
          <div>
            <div>
              Data de referência: {salary.referenceMonth} de
              {salary.referenceYear}
            </div>
            <div>Valor salário base: R$ {salary.amount}</div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
