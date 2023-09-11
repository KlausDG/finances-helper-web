import { JournalEntry } from "@/concepts/Journal";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";

type ReportTableProps = {
  reportEntries: JournalEntry[];
};

export const ReportTable = ({ reportEntries }: ReportTableProps) => {
  return (
    <TableContainer>
      <Table size="sm">
        <TableHeader />
        <Tbody>
          {reportEntries.map((entry, index) => (
            <TableRow reportEntry={entry} key={index} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
