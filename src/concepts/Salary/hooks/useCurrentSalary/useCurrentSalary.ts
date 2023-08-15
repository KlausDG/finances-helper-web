import { useEffect } from "react";
import { getCurrentSalary } from "../../repository";
import { useDispatch, useSelector } from "react-redux";
import { salarySelector, setSalary } from "../../store";

export const useCurrentSalary = () => {
  const dispatch = useDispatch();

  const salary = useSelector(salarySelector);

  const fetchCurrentSalary = async () => {
    try {
      const currentSalary = await getCurrentSalary();

      dispatch(setSalary(currentSalary));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentSalary();
    // eslint-disable-next-line
  }, []);

  return {
    salary,
  };
};
