import { Circle } from "@/components";

export const ColorSelector = ({
  color,
  selected,
}: {
  color: string;
  selected: boolean;
}) => {
  return <Circle className={color} selected={selected} />;
};
