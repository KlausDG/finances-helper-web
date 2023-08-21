import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import {
  CardHeaderContent,
  CreateJournalEntryModal,
  JournalEntryRow,
  journalSelector,
} from "@/concepts/Journal";
import { useCreateJournalEntry } from "@/concepts/Journal/providers";
import { useDate } from "@/hooks";

export const JournalPage = () => {
  const { modal } = useCreateJournalEntry();
  const { currentDate } = useDate();
  const journal = useSelector(journalSelector);

  return (
    <div>
      <Card className="w-[800px] m-auto">
        <CardHeader className="grid grid-cols-3">
          <CardHeaderContent currentDate={currentDate} modal={modal} />
        </CardHeader>
        <CardBody className="grid gap-2">
          {journal.map((journalEntry) => {
            return (
              <JournalEntryRow
                journalEntry={journalEntry}
                key={journalEntry.id}
              />
            );
          })}
        </CardBody>
      </Card>
      <CreateJournalEntryModal />
    </div>
  );
};
