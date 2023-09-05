import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import { Text } from "@chakra-ui/react";

type UsedAmountCellProps = {
  value: number;
  total: number;
};

export const UsedAmountCell = ({ value, total }: UsedAmountCellProps) => {
  return (
    <Text className="text-right" fontSize="xs">
      R$ {formatCurrency(value)} / R$
      {formatCurrency(total)}
    </Text>
  );
};
