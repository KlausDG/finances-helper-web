import { Title } from "@/components";
import { ColorSelector, availableColors } from "@/concepts/Categories";
import { ColorSectionProps } from "./ColorsSection.types";

export const ColorsSection = ({ color, selectColor }: ColorSectionProps) => {
  return (
    <section className="border-b py-6">
      <Title text="Escolha uma cor" />
      <div className="flex flex-wrap items-center justify-center mt-4">
        {availableColors.map((currentColor, index) => {
          return (
            <button
              key={index}
              className="p-1"
              onClick={() => selectColor("color", currentColor)}
            >
              <ColorSelector
                color={currentColor}
                selected={currentColor === color}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};
