import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { journalSelector } from "@/concepts/Journal";
import { PDF, ReportCard } from "@/concepts/Reports";
import { ReportData } from "@/concepts/Reports/types";
import { Button } from "@chakra-ui/react";

export const ReportsPage = () => {
  const journal = useSelector(journalSelector);

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
  }, [] as Array<ReportData>);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {categoryEntriesArray.map((categoryEntry, index) => {
          return <ReportCard report={categoryEntry} key={index} />;
        })}
      </div>
      <Button colorScheme="green">
        <PDFDownloadLink
          document={<PDF reportEntries={categoryEntriesArray} />}
          fileName="teste"
        >
          Download
        </PDFDownloadLink>
      </Button>
      <PDFViewer>
        <PDF reportEntries={categoryEntriesArray} />
      </PDFViewer>
    </div>
  );
};
