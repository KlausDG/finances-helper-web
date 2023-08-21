import { SalaryCard } from "@/concepts/Salary";
import { WalletsReportCard } from "@/concepts/Wallets";

export const Home = () => {
  return (
    <div className="grid gap-4 grid-cols-2">
      <SalaryCard />
      <WalletsReportCard />
    </div>
  );
};
