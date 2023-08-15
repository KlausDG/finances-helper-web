import { FieldValue } from "firebase/firestore";

export type Salary = {
  salary: string;
  id: string;
  createdAt: FieldValue;
  userId: string;
  referenceMonth: string;
  referenceYear: string | number;
};
