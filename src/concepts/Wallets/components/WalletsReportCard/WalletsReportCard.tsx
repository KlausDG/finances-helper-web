import { Card, CardBody, CardHeader, Divider, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getCurrentWalletPercentage,
  getSalaryAmountByWalletPercentage,
  sortWallets,
} from "../../utils";
import { journalSelector } from "@/concepts/Journal";
import { salarySelector } from "@/concepts/Salary";
import { useCallback, useEffect, useState } from "react";
import { FormattedWalletState, TotalUsedData } from "./WalletsReportCard.types";
import { walletsSelector } from "../../store";
import { ReportItem, ReportTotal } from "./components";

export const WalletsReportCard = () => {
  const [formattedWallets, setFormattedWallets] =
    useState<FormattedWalletState>([]);
  const [totalUsed, setTotalUsed] = useState<TotalUsedData>({
    value: 0,
    percentage: "",
  });

  const wallets = useSelector(walletsSelector);
  const salary = useSelector(salarySelector);
  const journalEntries = useSelector(journalSelector);

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
    const value = formattedWallets.reduce((acc, wallet) => {
      return acc + wallet.currentValue;
    }, 0);

    const percentage = getCurrentWalletPercentage(value, salary.amount);

    setTotalUsed({
      value,
      percentage: `${percentage} %`,
    });
  }, [formattedWallets, salary.amount]);

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
          <ReportItem wallet={wallet} />
        ))}
        <Divider />
        <ReportTotal
          value={totalUsed.value}
          total={salary.amount}
          used={totalUsed.percentage}
        />
      </CardBody>
    </Card>
  );
};
