export const getCurrentWalletPercentage = (
  value: number,
  totalValue: number
) => {
  const rawValue = (100 * value) / totalValue;
  return Number(rawValue.toFixed(2));
};
