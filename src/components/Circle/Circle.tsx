import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const circle = tv({
  base: "rounded-full flex items-center justify-center",
  variants: {
    size: {
      lg: "w-20 h-20",
      sm: "w-9 h-9",
    },
    selected: {
      true: "",
    },
  },
  compoundVariants: [
    {
      size: "lg",
      selected: true,
      className: "border-8",
    },
    {
      size: "sm",
      selected: true,
      className: "border-4",
    },
  ],
  defaultVariants: {
    size: "sm",
    selected: false,
  },
});

export const Circle = ({
  children,
  size,
  selected,
  className,
}: ComponentProps<"div"> & VariantProps<typeof circle>) => {
  return (
    <div className={circle({ size, selected, className })}>{children}</div>
  );
};
