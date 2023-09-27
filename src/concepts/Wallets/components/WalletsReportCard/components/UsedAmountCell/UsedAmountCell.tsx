import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

type UsedAmountCellProps = {
  value: number;
  total: number;
};

export const UsedAmountCell = ({ value, total }: UsedAmountCellProps) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Text className="text-right" fontSize="xs">
          R$ {formatCurrency(value)} / R$
          {formatCurrency(total)}
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <Text>R$ {formatCurrency(total - value)} disponível.</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
};
