import { WithChildren } from "@/types";

export const IconTemplate = ({ children }: WithChildren) => {
  return <div className="rounded-full bg-gray-300 w-min p-3">{children}</div>;
};
