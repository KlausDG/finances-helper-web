import * as allIcons from "react-icons/fa6";
import { IconProps } from "./Icon.types";

export const Icon = ({ iconName, size }: IconProps) => {
  const IconToDisplay = allIcons[iconName as keyof typeof allIcons];
  return <IconToDisplay color="white" size={size} />;
};
