import { createContext } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import currency from "currency.js";

import { authSelector } from "@/concepts/Auth";
import { categoriesSelector } from "@/concepts/Categories";
import { useModal } from "@/hooks";
import { WithChildren } from "@/types";
import { useLoading } from "@/providers";
import { CreateJournalEntryContextType } from "./createJournalEntryProvider.types";
import { JournalEntryFormData } from "../../types";
import { createJournalEntry } from "../../repository";
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

  const calculateEvenRebate = () => {
    const currentAmount = getValues("amount");

    const value = currency(currentAmount, {
      symbol: "R$ ",
      decimal: ",",
      separator: ".",
    })
      .divide(2)
      .format();
    setValue("rebateAmount", value, { shouldDirty: true });
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
    rebate: {
      toggle: toggleRebate,
      even: calculateEvenRebate,
    },
    register,
    control,
    watch,
    handleSubmit: handleSubmit(handleCreateJournalEntry),
    setValue,
  };

  return (
    <CreateJournalEntryContext.Provider value={value}>
      {children}
    </CreateJournalEntryContext.Provider>
  );
};
