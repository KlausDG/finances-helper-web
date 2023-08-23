import { monthNames } from "../constants";

export const getPreviousMonthWithYear = (
  currentMonthName: string,
  currentYear: number
) => {
  const currentMonthIndex = monthNames.indexOf(currentMonthName);
  if (currentMonthIndex === -1) {
    throw new Error("Invalid month name");
  }

  const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
  const previousYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
  const previousMonth = monthNames[previousMonthIndex];

  return { month: previousMonth, year: previousYear };
};
