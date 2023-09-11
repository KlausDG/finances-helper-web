import { Circle, Icon } from "@/components";
import { Category } from "@/concepts/Categories/types";
import { JournalEntry } from "@/concepts/Journal";
import { formatFirebaseTimestampToBrazilianDate } from "@/utils";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import {
  Card,
  CardHeader,
  CardBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";

type ReportCardProps = {
  report: {
    category: Category;
    entries: Array<JournalEntry>;
  };
};

export const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <Card key={report.category.id}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Circle size="sm" className={report.category.color}>
            {report.category.icon && (
              <Icon iconName={report.category.icon} size="18px" />
            )}
          </Circle>
          <Text>{report.category.name}</Text>
        </div>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Descrição</Th>
                <Th isNumeric>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {report.entries.map((entry) => (
                <Tr>
                  <Td>
                    {formatFirebaseTimestampToBrazilianDate(
                      entry.date as Timestamp
                    )}
                  </Td>
                  <Td>{entry.description}</Td>
                  <Td isNumeric>R$ {formatCurrency(entry.total)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
