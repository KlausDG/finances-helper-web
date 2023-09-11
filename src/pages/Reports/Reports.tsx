import {
  CardHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Circle, Icon } from "@/components";
import { JournalEntry, journalSelector } from "@/concepts/Journal";
import { Card, CardBody } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { formatFirebaseTimestampToBrazilianDate } from "@/utils";
import { Timestamp } from "firebase/firestore";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import { Category } from "@/concepts/Categories/types";
import { ReportCard } from "@/concepts/Reports";

type teste = Array<{
  category: Category;
  entries: Array<JournalEntry>;
}>;

export const ReportsPage = () => {
  const journal = useSelector(journalSelector);

  const journalEntry = journal[0];

  const categoryEntriesArray = journal.reduce((acc, entry) => {
    const categoryName = entry.category.name;
    const existingCategoryIndex = acc.findIndex(
      (item) => item.category.name === categoryName
    );

    if (existingCategoryIndex !== -1) {
      acc[existingCategoryIndex].entries.push(entry);
    } else {
      const newCategory = {
        category: entry.category,
        entries: [entry],
      };
      acc.push(newCategory);
    }

    return acc;
  }, [] as teste);

  return (
    <div className="grid grid-cols-2 gap-4">
      {categoryEntriesArray.map((categoryEntry, index) => {
        return <ReportCard report={categoryEntry} key={index} />;
      })}
    </div>
  );
};
