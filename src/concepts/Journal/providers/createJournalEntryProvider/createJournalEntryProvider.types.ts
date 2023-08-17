import { Control, UseFormRegister } from "react-hook-form";
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
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
};
