import { Title } from "@/components";
import { Button, Input } from "@chakra-ui/react";
import { useCreateWalletForm } from "../../hooks";
import { CreateWalletFormProps } from "./CreateWalletForm.types";
import { useLoading } from "@/providers";

export const CreateWalletForm = ({ closeModal }: CreateWalletFormProps) => {
  const { handleInputChange, wallet, handleCreateWallet } =
    useCreateWalletForm();

  const { loading } = useLoading();

  return (
    <div className="flex flex-col px-4 gap-6">
      <div>
        <Title text="Nome da carteira" />
        <Input
          variant="flushed"
          size="sm"
          value={wallet.name}
          onChange={(event) => handleInputChange("name", event.target.value)}
        />
      </div>
      <div>
        {/**
         * TODO:
         * - Move the available percentage text to the end of the line.
         * - Set the available percentage text based on the account percentage
         * - Add char limit based on the available account percentage.
         */}
        <Title text="Porcentagem (40/100%)" />
        <Input
          variant="flushed"
          size="sm"
          value={wallet.percentage}
          type="number"
          onChange={(event) =>
            handleInputChange("percentage", event.target.value)
          }
        />
      </div>
      <div className="mt-4 m-auto">
        <Button
          colorScheme="green"
          onClick={() => handleCreateWallet(closeModal)}
          isLoading={loading}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
};
