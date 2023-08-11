import { Circle, Icon } from "@/components";
import { CategoryRowItemProps } from "./CategoryRowItem.types";
import { Text, IconButton, ListItem } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const CategoryRowItem = ({ category }: CategoryRowItemProps) => {
  const { name, color, icon, wallet } = category;
  return (
    <ListItem className="flex justify-between items-center border-b pb-2">
      <div className="flex items-center gap-4">
        <Circle size="sm" className={color}>
          {icon && <Icon iconName={icon} size="18px" />}
        </Circle>
        <Text fontSize="sm">{name}</Text>
      </div>
      <div className="">
        <Text fontSize="sm">{wallet}</Text>
      </div>
      <div className="flex gap-2 ">
        <IconButton
          aria-label="Edit"
          colorScheme="green"
          size="sm"
          icon={<FaEdit />}
        />
        <IconButton
          aria-label="Remove"
          colorScheme="red"
          size="sm"
          icon={<FaTrash />}
        />
      </div>
    </ListItem>
  );
};
