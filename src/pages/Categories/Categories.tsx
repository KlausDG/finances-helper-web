import * as allIcons from "react-icons/fa6";
import { availableIconsFa } from "@/concepts/Categories";
import { IconType } from "react-icons";
import { IconTemplate } from "@/concepts/Categories/components";

export const CategoriesPage = () => {
  //Icon.name pega o nome do ícone.

  return (
    <div className="grid gap-4 grid-cols-6">
      {availableIconsFa.map((icon, index) => {
        const Icon: IconType = allIcons[icon as keyof typeof allIcons];

        return (
          <IconTemplate key={index}>
            <Icon color="rgb(107 114 128)" size="20px" />
          </IconTemplate>
        );
      })}
    </div>
  );
};
