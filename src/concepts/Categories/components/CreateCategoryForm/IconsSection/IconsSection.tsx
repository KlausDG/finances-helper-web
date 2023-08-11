import { Title } from "@/components";
import { IconTemplate } from "../..";
import { availableIconsFa } from "@/concepts/Categories";
import { IconType } from "react-icons";
import * as allIcons from "react-icons/fa6";
import { IconsSectionProps } from "./IconsSection.types";

export const IconsSection = ({ selectIcon }: IconsSectionProps) => {
  return (
    <section className="py-6">
      <Title text="Escolha um ícone" />
      <div className="flex flex-wrap items-center justify-center mt-4 overflow-auto h-32 p-2 gap-2">
        {availableIconsFa.map((currentIcon, index) => {
          const Icon: IconType = allIcons[currentIcon as keyof typeof allIcons];

          return (
            <button
              key={index}
              className="p-1"
              onClick={() => selectIcon("icon", currentIcon)}
            >
              <IconTemplate>
                <Icon color="rgb(107 114 128)" size="20px" />
              </IconTemplate>
            </button>
          );
        })}
      </div>
    </section>
  );
};
