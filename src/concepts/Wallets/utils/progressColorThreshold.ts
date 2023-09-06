import { valueToPercent } from "@/utils";

export const progressColorThreshold = (value: number, total: number) => {
  const percent = valueToPercent(value, total);
  if (percent < 34) {
    return "green";
  } else if (percent >= 35 && percent <= 66) {
    return "yellow";
  } else {
    return "red";
  }
};
