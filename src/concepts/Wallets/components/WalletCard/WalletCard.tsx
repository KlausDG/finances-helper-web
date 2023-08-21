import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { WalletCardProps } from "./WalletCard.types";

export const WalletCard = ({
  wallet,
  onEditClick,
  onRemoveClick,
}: WalletCardProps) => {
  return (
    <Card className="min-h-[210px]">
      <CardBody className="flex flex-col items-center justify-between">
        <div>
          <Heading size="md">{wallet.name}</Heading>
          <Text className="text-center mt-2">{wallet.percentage} %</Text>
        </div>
        <div className="flex gap-4">
          <Button colorScheme="green" className="w-32" onClick={onEditClick}>
            Editar
          </Button>
          <Button colorScheme="red" className="w-32" onClick={onRemoveClick}>
            Remover
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
