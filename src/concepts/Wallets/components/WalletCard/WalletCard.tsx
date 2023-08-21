import { Title } from "@/components";
import { Button, Card, CardBody, Heading } from "@chakra-ui/react";
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
          <Heading>{wallet.name}</Heading>
          <Title text={`${wallet.percentage} %`}></Title>
        </div>
        <div className="flex gap-4">
          <Button className="w-32" onClick={onEditClick}>
            Editar
          </Button>
          <Button className="w-32" onClick={onRemoveClick}>
            Remover
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
