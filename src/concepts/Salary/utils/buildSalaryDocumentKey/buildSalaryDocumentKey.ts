export const buildSalaryDocumentKey = (
  month: string,
  year: string | number
) => {
  return `${month}-${year}`;
};
