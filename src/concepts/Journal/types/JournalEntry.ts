import { Category } from "@/concepts/Categories/types";
import { FieldValue, Timestamp } from "firebase/firestore";

export type JournalEntryFormData = {
  description: string;
  amount: string;
  categoryId: string;
  date: Date;
  comment?: string;
  hasRebate: boolean;
  rebateAmount: string;
  rebateDescription: string;
};

export type Rebate = {
  hasRebate: boolean;
  amount: number;
  description: string;
};

export type JournalEntry = Required<Omit<JournalEntrySubmitData, "date">> & {
  id: string;
  date: Timestamp;
  createdAt: FieldValue;
  userId: string;
  referenceMonth: string;
  referenceYear: string | number;
  total: number;
};

export type JournalEntrySubmitData = Omit<
  JournalEntryFormData,
  "amount" | "categoryId" | "hasRebate" | "rebateAmount" | "rebateDescription"
> & {
  amount: number;
  category?: Category;
  rebate: Rebate;
};
