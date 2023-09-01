export const getSalaryAmountByWalletPercentage = (
  salary: number,
  walletPercentage: number
) => {
  const value = salary * (walletPercentage / 100);
  return Number(value.toFixed(2));
};
