import { HeaderProps } from "./Header.types";

export const Header = ({ menu }: HeaderProps) => {
  return (
    <section className="bg-green-500 h-14 flex items-center justify-center">
      {menu}
    </section>
  );
};
