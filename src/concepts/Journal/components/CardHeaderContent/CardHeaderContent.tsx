import toast from "react-hot-toast";
import { Heading, IconButton, MenuItem } from "@chakra-ui/react";

import { CreateJournalEntryMenu } from "../CreateJournalEntryMenu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CardHeaderContentProps } from "./CardHeaderContent.types";

export const CardHeaderContent = ({
  currentDate,
  modal,
}: CardHeaderContentProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Heading size="md">Lançamentos</Heading>
        <CreateJournalEntryMenu>
          <MenuItem onClick={() => modal.open()}>Despesa</MenuItem>
          <MenuItem onClick={() => toast.error("Não implementado")}>
            Receita
          </MenuItem>
        </CreateJournalEntryMenu>
      </div>

      <div className="flex items-center mx-auto gap-3">
        <IconButton
          aria-label="previous-month"
          size="sm"
          variant="ghost"
          icon={<FaChevronLeft />}
          onClick={() => toast.error("Não implementado")}
          isRound
        />

        <Heading size="md">
          {currentDate.month} - {currentDate.year}
        </Heading>

        <IconButton
          aria-label="next-month"
          size="sm"
          variant="ghost"
          icon={<FaChevronRight />}
          onClick={() => toast.error("Não implementado")}
          isRound
        />
      </div>
    </>
  );
};
