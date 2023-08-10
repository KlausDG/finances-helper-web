import { Circle, CreateIcon } from "@/components";
import { IconPreviewProps } from "./IconPreview.types";

export const IconPreview = ({ color, icon }: IconPreviewProps) => {
  return (
    <Circle size="lg" className={color || "bg-gray-300"} selected={true}>
      {icon && CreateIcon(icon)}
    </Circle>
  );
};
