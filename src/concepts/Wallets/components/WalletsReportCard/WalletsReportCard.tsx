import { Card, CardBody, CardHeader, Divider, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getCurrentWalletPercentage } from "../../utils";
import { salarySelector } from "@/concepts/Salary";
import { useEffect, useState } from "react";
import { TotalUsedData } from "./WalletsReportCard.types";
import { currentWalletsDataSelector } from "../../store";
import { ReportItem, ReportTotal } from "./components";

export const WalletsReportCard = () => {
  const [totalUsed, setTotalUsed] = useState<TotalUsedData>({
    value: 0,
    percentage: "",
  });

  const salary = useSelector(salarySelector);
  const currentWalletsData = useSelector(currentWalletsDataSelector);

  useEffect(() => {
    const value = currentWalletsData.reduce((acc, wallet) => {
      return acc + wallet.currentValue;
    }, 0);

    const percentage = getCurrentWalletPercentage(value, salary.amount);

    setTotalUsed({
      value,
      percentage: `${percentage} %`,
    });
  }, [currentWalletsData, salary.amount]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Carteiras - Resumo</Heading>
      </CardHeader>
      <CardBody className="grid gap-2">
        {currentWalletsData.map((wallet) => (
          <ReportItem wallet={wallet} key={wallet.id} />
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
