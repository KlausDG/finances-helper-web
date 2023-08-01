import { MenuProps } from "./Menu.types";

export const Menu = ({ children }: MenuProps) => {
  return <nav className="flex gap-4">{children}</nav>;
};
