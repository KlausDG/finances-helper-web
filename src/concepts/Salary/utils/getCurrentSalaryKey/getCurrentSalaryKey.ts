import { getMonthPtBR, getYear } from "@/utils";
import { buildSalaryDocumentKey } from "../buildSalaryDocumentKey";

export const getCurrentSalaryKey = () => {
  const month = getMonthPtBR();
  const year = getYear();

  return buildSalaryDocumentKey(month, year);
};
