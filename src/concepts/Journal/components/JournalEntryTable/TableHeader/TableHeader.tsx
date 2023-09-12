import { Thead, Tr, Th } from "@chakra-ui/table";

export const TableHeader = () => {
  return (
    <Thead>
      <Tr>
        <Th>Descrição</Th>
        <Th>Data</Th>
        <Th>Categoria</Th>
        <Th>Carteira</Th>
        <Th isNumeric>Valor</Th>
      </Tr>
    </Thead>
  );
};
