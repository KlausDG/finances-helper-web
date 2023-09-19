import { db } from "@/services/firebase";
import { AnyAction } from "@reduxjs/toolkit";
import {
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { Dispatch } from "react";
import { setJournalEntries } from "../../store";
import { journalCollection } from "../collection";

export const getJournalEntriesSnapshot = (
  userId: string | undefined,
  date: { month: string; year: number },
  dispatch: Dispatch<AnyAction>,
  stopLoading: () => void
) => {
  const q = query(
    collection(db, journalCollection),
    where("userId", "==", userId),
    where("referenceMonth", "==", date.month),
    where("referenceYear", "==", date.year),
    orderBy("date", "desc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const snapshot = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    dispatch(setJournalEntries(snapshot));
    stopLoading();
  });
};
