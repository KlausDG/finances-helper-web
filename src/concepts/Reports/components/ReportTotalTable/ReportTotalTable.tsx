import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import { TableContainer, Table, Tbody, Tr, Td } from "@chakra-ui/react";

type ReportTotalTableProps = {
  total: number;
};

export const ReportTotalTable = ({ total }: ReportTotalTableProps) => {
  return (
    <TableContainer>
      <Table size="sm">
        <Tbody>
          <Tr>
            <Td>Total:</Td>
            <Td>R$ {formatCurrency(total)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
