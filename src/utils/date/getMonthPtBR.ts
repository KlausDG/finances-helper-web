export const getMonthPtBR = () => {
  const today = new Date();
  const monthOptions: Intl.DateTimeFormatOptions = { month: "long" };
  const monthName = new Intl.DateTimeFormat(
    "pt-BR",
    monthOptions
  ).formatToParts(today)[0].value;

  return monthName;
};
