import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getCurrentWalletPercentage,
  getSalaryAmountByWalletPercentage,
  sortWallets,
} from "../../utils";
import { journalSelector } from "@/concepts/Journal";
import { salarySelector } from "@/concepts/Salary";
import { useCallback, useEffect, useState } from "react";
import {
  FormattedWalletItem,
  FormattedWalletState,
} from "./WalletsReportCard.types";
import { walletsSelector } from "../../store";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";

export const WalletsReportCard = () => {
  const [formattedWallets, setFormattedWallets] =
    useState<FormattedWalletState>([]);

  const wallets = useSelector(walletsSelector);
  const salary = useSelector(salarySelector);
  const journalEntries = useSelector(journalSelector);

  const valueToPercent = (value: number, max: number) => {
    return (value * 100) / max;
  };

  const progressColorThreshold = (wallet: FormattedWalletItem) => {
    const percent = valueToPercent(wallet.currentValue, wallet.totalValue);
    if (percent < 34) {
      return "green";
    } else if (percent >= 35 && percent <= 66) {
      return "yellow";
    } else {
      return "red";
    }
  };

  const sumEntriesByWalletName = useCallback(
    (walletName: string) => {
      return journalEntries.reduce((acc, entry) => {
        const wallet = entry.category?.wallet;
        if (wallet?.name === walletName) {
          acc += entry.total;
        }
        return acc;
      }, 0);
    },
    [journalEntries]
  );

  useEffect(() => {
    const sortedWallets = sortWallets(wallets, "percentage");

    const formattedWalletsArray = sortedWallets.map((wallet) => {
      const totalValue = getSalaryAmountByWalletPercentage(
        salary.amount,
        wallet.percentage
      );

      const currentValue = sumEntriesByWalletName(wallet.name);
      const currentUsedPercentage = getCurrentWalletPercentage(
        currentValue,
        totalValue
      );

      return {
        ...wallet,
        totalValue,
        currentValue,
        currentUsedPercentage: `${currentUsedPercentage} %`,
      };
    });

    setFormattedWallets(formattedWalletsArray);
  }, [salary.amount, sumEntriesByWalletName, wallets]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Carteiras - Resumo</Heading>
      </CardHeader>
      <CardBody className="grid gap-2">
        {formattedWallets.map((wallet) => (
          <div className="grid grid-cols-3 items-center" key={wallet.id}>
            <Text fontSize="sm">
              {wallet.name} ({wallet.percentage}%)
            </Text>
            <div className="relative pl-4">
              <Progress
                // colorScheme={progressColorThreshold(wallet)}
                size="lg"
                value={wallet.currentValue}
                max={wallet.totalValue}
              />
              <Text
                className="absolute translate-x-1/2 -translate-y-1/2 top-[55%] right-[50%] text-gray-200"
                fontSize="xs"
              >
                {wallet.currentUsedPercentage}
              </Text>
            </div>
            <Text className="text-right" fontSize="xs">
              R$ {formatCurrency(wallet.currentValue)} / R$
              {formatCurrency(wallet.totalValue)}
            </Text>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
