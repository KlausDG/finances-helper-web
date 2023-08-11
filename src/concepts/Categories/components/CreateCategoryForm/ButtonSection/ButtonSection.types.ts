import { ComponentProps } from "react";

export type ButtonSectionProps = ComponentProps<"button"> & {
  isLoading: boolean;
};
