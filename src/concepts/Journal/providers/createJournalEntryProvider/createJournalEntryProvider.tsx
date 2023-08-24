import { createContext } from "react";
import { CreateJournalEntryContextType } from "./createJournalEntryProvider.types";
import { WithChildren } from "@/types";
import { useModal } from "@/hooks";
import { useForm } from "react-hook-form";
import { JournalEntryFormData } from "../../types";
import { useLoading } from "@/providers";
import { categoriesSelector, selectCategoryById } from "@/concepts/Categories";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createJournalEntry } from "../../repository";
import { authSelector } from "@/concepts/Auth";

export const CreateJournalEntryContext =
  createContext<CreateJournalEntryContextType>(undefined);

const initialState: JournalEntryFormData = {
  description: "",
  amount: 0,
  categoryId: "",
  date: new Date(),
  comment: "",
  hasRebate: false,
  rebateAmount: 0,
  rebateDescription: "",
};

export const CreateJournalEntryProvider = ({ children }: WithChildren) => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    resetField,
    watch,
  } = useForm<JournalEntryFormData>({
    defaultValues: initialState,
  });

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
      const { description, amount, categoryId, date, comment } = formValues;

      const category = selectCategoryById(categories, categoryId);

      const journalEntry = {
        description,
        amount: Number(amount),
        date,
        comment,
        category,
        rebate: {
          hasRebate: formValues.hasRebate,
          amount: Number(formValues.rebateAmount),
          description: formValues.rebateDescription,
        },
        total: Number(amount + formValues.rebateAmount),
      };

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
  };

  return (
    <CreateJournalEntryContext.Provider value={value}>
      {children}
    </CreateJournalEntryContext.Provider>
  );
};
