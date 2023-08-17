import { Category } from "@/concepts/Categories/types";
import { FieldValue, Timestamp } from "firebase/firestore";

export type JournalEntryFormData = {
  description: string;
  amount: number;
  categoryId: string;
  date: Date | Timestamp;
  comment?: string;
};

export type JournalEntry = JournalEntrySubmitData & {
  id: string;
  createdAt: FieldValue;
  userId: string;
  referenceMonth: string;
  referenceYear: string | number;
};

export type JournalEntrySubmitData = Omit<
  JournalEntryFormData,
  "categoryId"
> & {
  category?: Category;
};
