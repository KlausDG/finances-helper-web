import { db } from "@/services/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { setWallets } from "../../store";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

export const getWalletsSnapshot = (
  userId: string,
  dispatch: Dispatch<AnyAction>
) => {
  const q = query(collection(db, "wallets"), where("userId", "==", userId));

  return onSnapshot(q, (querySnapshot) => {
    const snapshot = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    dispatch(setWallets(snapshot));
  });
};
