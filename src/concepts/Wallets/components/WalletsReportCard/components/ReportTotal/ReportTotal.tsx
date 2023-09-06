import { Text } from "@chakra-ui/react";
import { PercentageCell, UsedAmountCell } from "..";

type ReportTotalProps = { value: number; total: number; used: string };

export const ReportTotal = ({ value, total, used }: ReportTotalProps) => {
  return (
    <div className="grid grid-cols-3 items-center">
      <Text fontSize="sm">Total</Text>
      <PercentageCell current={value} total={Number(total)} used={used} />
      <UsedAmountCell value={value} total={Number(total)} />
    </div>
  );
};
