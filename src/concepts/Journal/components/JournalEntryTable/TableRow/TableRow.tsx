import { Circle, Icon } from "@/components";
import { JournalEntry } from "@/concepts/Journal";
import {
  currentWalletsDataSelector,
  getCurrentWalletPercentage,
} from "@/concepts/Wallets";
import { formatFirebaseTimestampToBrazilianDate } from "@/utils";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import {
  Tr,
  Td,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

type TableRowProps = {
  journalEntry: JournalEntry;
};

export const TableRow = ({ journalEntry }: TableRowProps) => {
  const { category, rebate } = journalEntry;

  const currentWalletsData = useSelector(currentWalletsDataSelector);

  const findWalletDataByWalletId = (id: string) => {
    return currentWalletsData.find((walletData) => walletData.id === id);
  };

  const fetchWalletTotalValue = (id: string) => {
    const walletData = findWalletDataByWalletId(id);

    return walletData?.totalValue ?? 0;
  };

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Tr>
          <Td>
            <div className="flex items-center gap-4">
              <Circle size="sm" className={category?.color}>
                {category?.icon && (
                  <Icon iconName={category?.icon} size="18px" />
                )}
              </Circle>
              <Text>{journalEntry.description}</Text>
            </div>
          </Td>
          <Td>
            <Text>
              {formatFirebaseTimestampToBrazilianDate(
                journalEntry.date as Timestamp
              )}
            </Text>
          </Td>
          <Td>
            <Text>{category.name}</Text>
          </Td>
          <Td>
            <Text>{category.wallet?.name}</Text>
          </Td>
          <Td isNumeric>
            <Text>
              R$ {formatCurrency(journalEntry.total)} (
              {getCurrentWalletPercentage(
                journalEntry.total,
                fetchWalletTotalValue(journalEntry.category.wallet.id)
              )}
              %)
            </Text>
          </Td>
        </Tr>
      </PopoverTrigger>

      <PopoverContent>
        <div className="grid gap-2 p-4">
          <Text>{journalEntry.comment}</Text>
          <div className="flex justify-between">
            <Text>Valor:</Text>
            <Text>R$ {formatCurrency(journalEntry.amount)}</Text>
          </div>
          <div className="flex justify-between border-b pb-2">
            <Text>Rebate:</Text>
            <Text>- R$ {formatCurrency(rebate.amount)}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Total:</Text>
            <Text>R$ {formatCurrency(journalEntry.total)}</Text>
          </div>
          <Text>Motivo: {rebate.description}</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
};
