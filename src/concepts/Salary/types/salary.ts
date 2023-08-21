import { FieldValue } from "firebase/firestore";

export type Salary = {
  amount: number;
  id: string;
  createdAt: FieldValue;
  userId: string;
  referenceMonth: string;
  referenceYear: string | number;
};
