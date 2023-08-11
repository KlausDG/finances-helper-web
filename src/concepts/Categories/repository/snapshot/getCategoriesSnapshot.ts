import { db } from "@/services/firebase";
import { AnyAction } from "@reduxjs/toolkit";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Dispatch } from "react";
import { setCategories } from "../../store";

export const getCategoriesSnapshot = (
  userId: string,
  dispatch: Dispatch<AnyAction>,
  stopLoading: () => void
) => {
  const q = query(collection(db, "categories"), where("userId", "==", userId));

  return onSnapshot(q, (querySnapshot) => {
    const snapshot = querySnapshot.docs.map((doc) => {
      console.log(doc.data());

      return doc.data();
    });

    dispatch(setCategories(snapshot));
    stopLoading();
  });
};
