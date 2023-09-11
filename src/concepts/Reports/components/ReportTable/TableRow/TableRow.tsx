import { JournalEntry } from "@/concepts/Journal";
import { formatFirebaseTimestampToBrazilianDate } from "@/utils";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import { Td, Tr } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";

type TableRowProps = { reportEntry: JournalEntry };

export const TableRow = ({ reportEntry }: TableRowProps) => {
  return (
    <Tr>
      <Td>
        {formatFirebaseTimestampToBrazilianDate(reportEntry.date as Timestamp)}
      </Td>
      <Td>{reportEntry.description}</Td>
      <Td isNumeric>R$ {formatCurrency(reportEntry.total)}</Td>
    </Tr>
  );
};
