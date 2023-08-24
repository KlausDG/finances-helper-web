import { Category } from "@/concepts/Categories/types";
import { FieldValue, Timestamp } from "firebase/firestore";

export type JournalEntryFormData = {
  description: string;
  amount: number;
  categoryId: string;
  date: Date;
  comment?: string;
  hasRebate: boolean;
  rebateAmount: number;
  rebateDescription: string;
};

export type Rebate = {
  hasRebate: boolean;
  amount: number;
  description: string;
};

export type JournalEntry = Omit<JournalEntrySubmitData, "date"> & {
  id: string;
  date: Timestamp;
  createdAt: FieldValue;
  userId: string;
  referenceMonth: string;
  referenceYear: string | number;
};

export type JournalEntrySubmitData = Omit<
  JournalEntryFormData,
  "categoryId" | "hasRebate" | "rebateAmount" | "rebateDescription"
> & {
  category?: Category;
  rebate: Rebate;
};
