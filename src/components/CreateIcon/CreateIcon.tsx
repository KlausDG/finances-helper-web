import * as allIcons from "react-icons/fa6";

export const CreateIcon = (iconName: string | undefined) => {
  const Icon = allIcons[iconName as keyof typeof allIcons];
  return <Icon color="white" size="32px" />;
};
