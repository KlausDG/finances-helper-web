import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import { JournalEntryFormData } from "../../types";

export type CreateJournalEntryContextType =
  | CreateJournalEntryContextReturn
  | undefined;

type CreateJournalEntryContextReturn = {
  modal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  register: UseFormRegister<JournalEntryFormData>;
  control: Control<JournalEntryFormData, unknown>;
  watch: UseFormWatch<JournalEntryFormData>;
  toggleRebate: () => void;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
};
