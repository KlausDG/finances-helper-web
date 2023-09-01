import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Wallet, sortWallets, walletsSelector } from "../..";
import { journalSelector } from "@/concepts/Journal";
import { salarySelector } from "@/concepts/Salary";
import { useCallback, useEffect, useState } from "react";

export const WalletsReportCard = () => {
  const [formattedWallets, setFormattedWallets] = useState<
    Array<
      Wallet & {
        totalValue: number;
        currentValue: number;
        currentUsedPercentage: string;
      }
    >
  >([]);
  const wallets = useSelector(walletsSelector);
  const salary = useSelector(salarySelector);
  const journalEntries = useSelector(journalSelector);

  const getSalaryAmountByWalletPercentage = (
    salary: number,
    walletPercentage: number
  ) => {
    const value = salary * (walletPercentage / 100);
    return Number(value.toFixed(2));
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

  const getCurrentPercentage = (value: number, totalValue: number) => {
    const rawValue = (100 * value) / totalValue;
    return Number(rawValue.toFixed(2));
  };

  useEffect(() => {
    const sortedWallets = sortWallets(wallets, "percentage");

    const formattedWalletsArray = sortedWallets.map((wallet) => {
      const totalValue = getSalaryAmountByWalletPercentage(
        salary.amount,
        wallet.percentage
      );

      const currentValue = sumEntriesByWalletName(wallet.name);
      const currentUsedPercentage = getCurrentPercentage(
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
          <div className="grid grid-cols-5 items-center gap-4" key={wallet.id}>
            <Text className="col-span-2">
              {wallet.name} ({wallet.percentage}%)
            </Text>
            <div className="col-span-2 relative">
              <Progress
                colorScheme="green"
                size="lg"
                value={wallet.currentValue}
                max={wallet.totalValue}
              />
              <Text
                className="absolute translate-x-1/2 -translate-y-1/2 top-[55%] right-[50%] text-gray-400"
                fontSize="xs"
              >
                {wallet.currentUsedPercentage}
              </Text>
            </div>
            <div className="text-right">
              {wallet.currentValue}/{wallet.totalValue}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
