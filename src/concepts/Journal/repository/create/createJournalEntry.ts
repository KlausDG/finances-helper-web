import { v4 as uuidv4 } from "uuid";
import { JournalEntrySubmitData } from "../../types";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import toast from "react-hot-toast";

export const createJournalEntry = async (
  journalEntryData: JournalEntrySubmitData,
  userId: string
) => {
  const journalEntry = {
    ...journalEntryData,
    id: uuidv4(),
    createdAt: serverTimestamp(),
    referenceMonth: journalEntryData.date.toLocaleString("pt-BR", {
      month: "long",
    }),
    referenceYear: journalEntryData.date.getFullYear(),
    userId,
  };

  const collectionRef = collection(db, "journal");

  try {
    const documentRef = doc(collectionRef, journalEntry.id);
    await setDoc(documentRef, journalEntry);
    toast.success("Lançamento efetuado com sucesso!");
  } catch (error) {
    console.error(error);
  }
};
