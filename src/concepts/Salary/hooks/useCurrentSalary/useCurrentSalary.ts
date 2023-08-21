import { useSelector } from "react-redux";
import { salarySelector } from "../../store";

export const useCurrentSalary = () => {
  const salary = useSelector(salarySelector);

  return {
    salary,
  };
};
