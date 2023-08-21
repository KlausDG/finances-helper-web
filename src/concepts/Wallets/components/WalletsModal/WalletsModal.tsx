import { Title } from "@/components";
import { Button, Input } from "@chakra-ui/react";

type WalletsModalProps = {
  wallet: {
    name: string;
    percentage: number;
  };
  currentAccountPercentage: number;
  handleNameInputChange: (value: string) => void;
  handlePercentageInputChange: (value: number) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
};

export const WalletsModal = ({
  wallet,
  currentAccountPercentage,
  handleNameInputChange,
  handlePercentageInputChange,
  onSubmit,
  isLoading,
}: WalletsModalProps) => {
  return (
    <div className="flex flex-col px-4 gap-6">
      <div>
        <Title text="Nome da carteira" />
        <Input
          variant="flushed"
          size="sm"
          value={wallet.name}
          onChange={(event) => handleNameInputChange(event.target.value)}
        />
      </div>
      <div>
        <Title text={`Porcentagem (${currentAccountPercentage}/100%)`} />
        <Input
          variant="flushed"
          size="sm"
          value={wallet.percentage}
          type="number"
          onChange={(event) =>
            handlePercentageInputChange(Number(event.target.value))
          }
        />
      </div>
      <div className="mt-4 m-auto">
        <Button colorScheme="green" onClick={onSubmit} isLoading={isLoading}>
          Concluir
        </Button>
      </div>
    </div>
  );
};
