import { createContext } from "react";
import { CreateJournalEntryContextType } from "./createJournalEntryProvider.types";
import { WithChildren } from "@/types";
import { useModal } from "@/hooks";
import { useForm } from "react-hook-form";
import { JournalEntryFormData } from "../../types";
import { useLoading } from "@/providers";
import { categoriesSelector } from "@/concepts/Categories";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createJournalEntry } from "../../repository";
import { authSelector } from "@/concepts/Auth";
import { convertFormData } from "../../dto";

export const CreateJournalEntryContext =
  createContext<CreateJournalEntryContextType>(undefined);

const initialState: JournalEntryFormData = {
  description: "",
  amount: "",
  categoryId: "",
  date: new Date(),
  comment: "",
  hasRebate: false,
  rebateAmount: "",
  rebateDescription: "",
};

export const CreateJournalEntryProvider = ({ children }: WithChildren) => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    resetField,
    watch,
  } = useForm<JournalEntryFormData>({
    defaultValues: initialState,
  });

  console.log(watch("amount"));

  const { isOpen, closeModal, openModal } = useModal();
  const { loading, startLoading, stopLoading } = useLoading();

  const { user } = useSelector(authSelector);
  const categories = useSelector(categoriesSelector);

  const toggleRebate = () => {
    if (!watch("hasRebate")) {
      resetField("rebateAmount");
      resetField("rebateDescription");
    }
  };

  const handleCreateJournalEntry = () => {
    startLoading();

    try {
      const formValues = getValues();

      const journalEntry = convertFormData(formValues, categories);

      createJournalEntry(journalEntry, user!.uid);
    } catch (error) {
      toast.error("Ocorreu um erro.");
    } finally {
      reset();
      stopLoading();
      closeModal();
    }
  };

  const handleCloseFormModal = () => {
    reset();
    closeModal();
  };

  const value = {
    modal: {
      isOpen,
      open: openModal,
      close: handleCloseFormModal,
    },
    loading: {
      isLoading: loading,
      start: startLoading,
      stop: stopLoading,
    },
    register,
    control,
    watch,
    handleSubmit: handleSubmit(handleCreateJournalEntry),
    toggleRebate,
    setValue,
  };

  return (
    <CreateJournalEntryContext.Provider value={value}>
      {children}
    </CreateJournalEntryContext.Provider>
  );
};
