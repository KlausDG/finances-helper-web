import { monthNames } from "../constants";

export const getNextMonthWithYear = (
  currentMonthName: string,
  currentYear: number
) => {
  const currentMonthIndex = monthNames.indexOf(currentMonthName);
  if (currentMonthIndex === -1) {
    throw new Error("Invalid month name");
  }

  const nextMonthIndex = (currentMonthIndex + 1) % 12;
  const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;
  const nextMonth = monthNames[nextMonthIndex];

  return { month: nextMonth, year: nextYear };
};
