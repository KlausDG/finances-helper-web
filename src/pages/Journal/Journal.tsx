import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import {
  CardHeaderContent,
  CreateJournalEntryModal,
  JournalEntryTable,
  journalSelector,
} from "@/concepts/Journal";
import { useCreateJournalEntry } from "@/concepts/Journal/providers";
import { selectedDateSelector } from "@/store/selectedDate";

export const JournalPage = () => {
  const { modal } = useCreateJournalEntry();
  const journal = useSelector(journalSelector);
  const selectedDate = useSelector(selectedDateSelector);

  return (
    <div>
      <Card className="w-[1200px] m-auto">
        <CardHeader className="grid grid-cols-3">
          <CardHeaderContent currentDate={selectedDate} modal={modal} />
        </CardHeader>
        <CardBody className="grid gap-2">
          <JournalEntryTable journal={journal} />
        </CardBody>
      </Card>
      <CreateJournalEntryModal />
    </div>
  );
};
