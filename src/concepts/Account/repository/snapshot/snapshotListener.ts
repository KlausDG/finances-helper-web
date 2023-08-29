import { db } from "@/services/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { setAccount } from "../..";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { accountCollection } from "../collection";

export const getAccountSnapshot = (
  userId: string,
  dispatch: Dispatch<AnyAction>,
  stopLoading: () => void
) => {
  const q = query(
    collection(db, accountCollection),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.docs[0]) {
      const payload = querySnapshot.docs[0].data();

      dispatch(setAccount(payload));
    }
    stopLoading();
  });
};
