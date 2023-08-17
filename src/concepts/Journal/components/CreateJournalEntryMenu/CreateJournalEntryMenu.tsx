import { WithChildren } from "@/types";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

export const CreateJournalEntryMenu = ({ children }: WithChildren) => {
  return (
    <Menu isLazy>
      <MenuButton>
        <div className="rounded-full bg-red-500 text-white p-2">
          <FaPlus className="text-xl" />
        </div>
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
};
