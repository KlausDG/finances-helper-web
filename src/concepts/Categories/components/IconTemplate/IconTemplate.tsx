import { Circle } from "@/components";
import { WithChildren } from "@/types";

export const IconTemplate = ({ children }: WithChildren) => {
  return <Circle className="bg-gray-300">{children}</Circle>;
};
