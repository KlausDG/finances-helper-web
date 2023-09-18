import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { TableHeader } from "./TableHeader";
import { JournalState } from "../../types";
import { TableRow } from "./TableRow";

type JournalEntryTableProps = {
  journal: JournalState;
};

export const JournalEntryTable = ({ journal }: JournalEntryTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader />
        <Tbody>
          {journal.map((journalEntry, index) => (
            <TableRow journalEntry={journalEntry} key={index} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
