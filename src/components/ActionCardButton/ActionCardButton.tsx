import { HtmlHTMLAttributes } from "react";

export const ActionCardButton = ({
  children,
  onClick,
}: HtmlHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="min-h-[210px] border-dashed border-2 w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
