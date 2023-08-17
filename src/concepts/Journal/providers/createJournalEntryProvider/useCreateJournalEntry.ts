import { useContext } from "react";
import { CreateJournalEntryContext } from ".";

export const useCreateJournalEntry = () => {
  const context = useContext(CreateJournalEntryContext);

  if (context === undefined) {
    throw new Error(
      "useCreateJournalEntry must be used within a CreateJournalEntryProvider"
    );
  }

  return context;
};
