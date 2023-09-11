import { JournalEntry, journalSelector } from "@/concepts/Journal";
import { useSelector } from "react-redux";
import { Category } from "@/concepts/Categories/types";
import { ReportCard } from "@/concepts/Reports";

type CategoryEntries = Array<{
  category: Category;
  entries: Array<JournalEntry>;
}>;

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
  }, [] as CategoryEntries);

  return (
    <div className="grid grid-cols-2 gap-4">
      {categoryEntriesArray.map((categoryEntry, index) => {
        return <ReportCard report={categoryEntry} key={index} />;
      })}
    </div>
  );
};
