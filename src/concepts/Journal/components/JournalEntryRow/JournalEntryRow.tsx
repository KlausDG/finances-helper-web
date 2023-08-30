import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { JournalEntryRowProps } from "./JournalEntryRow.types";
import { Circle, Icon } from "@/components";
import { formatFirebaseTimestampToBrazilianDate } from "@/utils";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";

export const JournalEntryRow = ({ journalEntry }: JournalEntryRowProps) => {
  const { category, rebate } = journalEntry;

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <div className="grid grid-cols-3 gap-4 items-center border-b pb-2">
          <div className="flex items-center gap-4">
            <Circle size="sm" className={category?.color}>
              {category?.icon && <Icon iconName={category?.icon} size="18px" />}
            </Circle>
            <Text>{journalEntry.description}</Text>
          </div>
          <Text className="text-center">
            {formatFirebaseTimestampToBrazilianDate(
              journalEntry.date as Timestamp
            )}
          </Text>
          <Text>R$ {formatCurrency(journalEntry.total)}</Text>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2 p-4">
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
        </div>
      </PopoverContent>
    </Popover>
  );
};
