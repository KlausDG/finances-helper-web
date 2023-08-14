import { menu } from "@/routes";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <nav className="flex gap-4">
      {menu.map(({ link, text }) => {
        return (
          <Link to={link} className="text-white" key={link}>
            {text}
          </Link>
        );
      })}
    </nav>
  );
};
