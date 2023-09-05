import { progressColorThreshold } from "@/concepts/Wallets";
import { Progress, Text } from "@chakra-ui/react";
import { PercentageCellProps } from "./PercentageCell.types";

export const PercentageCell = ({
  current,
  total,
  used,
}: PercentageCellProps) => {
  return (
    <div className="relative pl-4">
      <Progress
        colorScheme={progressColorThreshold(current, total)}
        size="lg"
        value={current}
        max={total}
      />
      <Text
        className="absolute translate-x-1/2 -translate-y-1/2 top-[55%] right-[50%] text-gray-200"
        fontSize="xs"
      >
        {used}
      </Text>
    </div>
  );
};
