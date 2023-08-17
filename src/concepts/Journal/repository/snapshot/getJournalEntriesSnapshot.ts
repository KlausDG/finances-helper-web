import { db } from "@/services/firebase";
import { AnyAction } from "@reduxjs/toolkit";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { Dispatch } from "react";
import { setJournalEntries } from "../../store";

export const getJournalEntriesSnapshot = (
  userId: string | undefined,
  date: { month: string; year: number },
  dispatch: Dispatch<AnyAction>,
  stopLoading: () => void
) => {
  console.log(date);

  const q = query(
    collection(db, "journal"),
    where("userId", "==", userId),
    where("referenceMonth", "==", date.month),
    where("referenceYear", "==", date.year)
  );

  return onSnapshot(q, (querySnapshot) => {
    const snapshot = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    dispatch(setJournalEntries(snapshot));
    stopLoading();
  });
};
