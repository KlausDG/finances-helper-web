import { Thead, Tr, Th } from "@chakra-ui/react";

export const TableHeader = () => {
  return (
    <Thead>
      <Tr>
        <Th>Data</Th>
        <Th>Descrição</Th>
        <Th isNumeric>Valor</Th>
      </Tr>
    </Thead>
  );
};
