import { Category } from "@/concepts/Categories/types";
import { JournalEntry } from "@/concepts/Journal";

export type Report = {
  report: ReportData;
};

export type ReportData = {
  category: Category;
  entries: Array<JournalEntry>;
};
