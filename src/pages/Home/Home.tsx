import { SalaryCard } from "@/concepts/Salary";
import { WalletsReportCard } from "@/concepts/Wallets";
import { salarySelector } from "@/concepts/Salary";
import { useSelector } from "react-redux";

export const Home = () => {
  const salary = useSelector(salarySelector);
  return (
    <div className="grid gap-4 grid-cols-2">
      <SalaryCard />
      {!!salary.amount && <WalletsReportCard />}
    </div>
  );
};
