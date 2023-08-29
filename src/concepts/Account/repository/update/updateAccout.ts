import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { accountCollection } from "../collection";

export const updateAccountPercentage = (percentage: number, userId: string) => {
  try {
    const collectionRef = collection(db, accountCollection);
    const userDataRef = doc(collectionRef, userId);

    updateDoc(userDataRef, {
      totalPercentage: {
        value: percentage,
        lastUpdate: serverTimestamp(),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
