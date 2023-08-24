import { useState } from "react";

export const useDate = () => {
  const [currentDate, setCurrentDate] = useState({
    month: new Date().toLocaleString("pt-BR", {
      month: "long",
    }),
    year: new Date().getFullYear(),
  });

  const updateDate = (date: { month: string; year: number }) => {
    setCurrentDate(date);
  };

  return {
    currentDate,
    updateDate,
  };
};
