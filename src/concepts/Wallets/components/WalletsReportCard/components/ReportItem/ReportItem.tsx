import { Text } from "@chakra-ui/react";
import { FormattedWalletItem } from "../../WalletsReportCard.types";
import { PercentageCell, UsedAmountCell } from "..";

export const ReportItem = ({ wallet }: { wallet: FormattedWalletItem }) => {
  return (
    <div className="grid grid-cols-3 items-center" key={wallet.id}>
      <Text fontSize="sm">
        {wallet.name} ({wallet.percentage}%)
      </Text>
      <PercentageCell
        current={wallet.currentValue}
        total={wallet.totalValue}
        used={wallet.currentUsedPercentage}
      />
      <UsedAmountCell value={wallet.currentValue} total={wallet.totalValue} />
    </div>
  );
};
