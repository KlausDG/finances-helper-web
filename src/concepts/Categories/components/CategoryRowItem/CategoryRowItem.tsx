import { Circle, Icon } from "@/components";
import { CategoryRowItemProps } from "./CategoryRowItem.types";
import { Text, ListItem } from "@chakra-ui/react";

export const CategoryRowItem = ({
  category,
  children,
}: CategoryRowItemProps) => {
  const { name, color, icon, wallet, type } = category;
  const categoryTypes = {
    income: "Renda",
    expense: "Despesa",
  };
  return (
    <ListItem className="grid grid-cols-5 items-center border-b pb-2">
      <div className="flex items-center gap-4 col-span-2">
        <Circle size="sm" className={color}>
          {icon && <Icon iconName={icon} size="18px" />}
        </Circle>
        <Text fontSize="sm">{name}</Text>
      </div>
      <div className="">
        <Text fontSize="sm">
          {categoryTypes[type as keyof typeof categoryTypes]}
        </Text>
      </div>
      <div className="">
        <Text fontSize="sm">{wallet}</Text>
      </div>
      <div className="flex gap-2 justify-self-end">{children}</div>
    </ListItem>
  );
};
