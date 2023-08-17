import { Circle, Icon } from "@/components";
import {
  CreateJournalEntryMenu,
  CreateJournalEntryModal,
  journalSelector,
} from "@/concepts/Journal";
import { useCreateJournalEntry } from "@/concepts/Journal/providers";
import { useDate } from "@/hooks";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  MenuItem,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";

export const JournalPage = () => {
  const { modal } = useCreateJournalEntry();
  const { currentDate } = useDate();
  const journal = useSelector(journalSelector);

  function formatFirebaseTimestampToBrazilianDate(timestamp: Timestamp) {
    const date = timestamp.toDate();

    const formattedDate = date.toLocaleDateString("pt-BR");
    return formattedDate;
  }

  return (
    <div>
      <Card className="w-[800px] m-auto">
        <CardHeader className="grid grid-cols-3">
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
              onClick={() => console.log("TODO")}
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
              onClick={() => console.log("TODO")}
              isRound
            />
          </div>
        </CardHeader>
        <CardBody>
          {journal.map((journalEntry) => {
            console.log(journalEntry.date);

            return (
              <div className="flex gap-4 items-center">
                <Circle size="sm" className={journalEntry.category?.color}>
                  {journalEntry.category?.icon && (
                    <Icon iconName={journalEntry.category?.icon} size="18px" />
                  )}
                </Circle>
                <p>{journalEntry.description}</p>
                <p>
                  {formatFirebaseTimestampToBrazilianDate(
                    journalEntry.date as Timestamp
                  )}
                </p>
                <p>R$ {journalEntry.amount}</p>
              </div>
            );
          })}
        </CardBody>
      </Card>
      <CreateJournalEntryModal />
    </div>
  );
};
