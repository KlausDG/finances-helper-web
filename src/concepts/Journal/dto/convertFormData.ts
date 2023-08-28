import { selectCategoryById } from "@/concepts/Categories";
import { JournalEntryFormData } from "../types";
import { Category } from "@/concepts/Categories/types";
import { parseCurrency } from "@brazilian-utils/brazilian-utils";

export const convertFormData = (
  formData: JournalEntryFormData,
  categories: Array<Category>
) => {
  const {
    description,
    amount,
    categoryId,
    date,
    comment,
    hasRebate,
    rebateAmount,
    rebateDescription,
  } = formData;

  const category = selectCategoryById(categories, categoryId);

  const parsedAmount = parseCurrency(amount);
  const parsedRebate = parseCurrency(rebateAmount);

  const total = hasRebate ? parsedAmount - parsedRebate : parsedAmount;

  return {
    description,
    amount: parsedAmount,
    date,
    comment,
    category,
    rebate: {
      hasRebate: hasRebate,
      amount: parsedRebate,
      description: rebateDescription,
    },
    total,
  };
};
