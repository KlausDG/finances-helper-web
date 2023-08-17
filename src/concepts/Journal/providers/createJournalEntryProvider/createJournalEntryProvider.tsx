import { createContext } from "react";
import { CreateJournalEntryContextType } from "./createJournalEntryProvider.types";
import { WithChildren } from "@/types";
import { useModal } from "@/hooks";
import { useForm } from "react-hook-form";
import { JournalEntryFormData } from "../../types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "@/providers";
import { categoriesSelector, selectCategoryById } from "@/concepts/Categories";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createJournalEntry } from "../../repository";
import { authSelector } from "@/concepts/Auth";

export const CreateJournalEntryContext =
  createContext<CreateJournalEntryContextType>(undefined);

const schema = yup.object({
  description: yup.string().required(),
  amount: yup.number().required(),
  categoryId: yup.string().required(),
  date: yup.date().required(),
  comment: yup.string(),
});

const initialState: JournalEntryFormData = {
  description: "",
  amount: 0,
  categoryId: "",
  date: new Date(),
  comment: "",
};

export const CreateJournalEntryProvider = ({ children }: WithChildren) => {
  const { register, control, handleSubmit, getValues, reset } =
    useForm<JournalEntryFormData>({
      resolver: yupResolver<JournalEntryFormData>(schema),
      defaultValues: initialState,
    });

  const { isOpen, closeModal, openModal } = useModal();
  const { loading, startLoading, stopLoading } = useLoading();

  const { user } = useSelector(authSelector);
  const categories = useSelector(categoriesSelector);

  const handleCreateJournalEntry = () => {
    startLoading();

    try {
      const { description, amount, categoryId, date, comment } = getValues();

      const category = selectCategoryById(categories, categoryId);

      const journalEntry = {
        description,
        amount,
        date,
        comment,
        category,
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
    handleSubmit: handleSubmit(handleCreateJournalEntry),
  };

  return (
    <CreateJournalEntryContext.Provider value={value}>
      {children}
    </CreateJournalEntryContext.Provider>
  );
};
