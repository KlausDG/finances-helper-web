import { db } from "@/services/firebase";
import { AnyAction } from "@reduxjs/toolkit";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Dispatch } from "react";
import { setCategories } from "../../store";

export const getCategoriesSnapshot = (
  userId: string | undefined,
  dispatch: Dispatch<AnyAction>,
  stopLoading: () => void
) => {
  const q = query(collection(db, "categories"), where("userId", "==", userId));

  return onSnapshot(q, (querySnapshot) => {
    const snapshot = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    dispatch(setCategories(snapshot));
    stopLoading();
  });
};
