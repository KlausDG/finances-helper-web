import { db } from "@/services/firebase";
import { AnyAction } from "@reduxjs/toolkit";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { Dispatch } from "react";
import { setSalary } from "../../store";

export const getSalarySnapshot = (
  userId: string,
  month: string,
  year: number,
  dispatch: Dispatch<AnyAction>,
  stopLoading: () => void
) => {
  const q = query(
    collection(db, "salaries"),
    where("userId", "==", userId),
    where("referenceMonth", "==", month),
    where("referenceYear", "==", year)
  );

  return onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.docs[0]) {
      const payload = querySnapshot.docs[0].data();

      dispatch(setSalary(payload));
    }

    stopLoading();
  });
};
