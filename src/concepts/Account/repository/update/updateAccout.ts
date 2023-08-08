import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";

export const updateAccountPercentage = (percentage: number, userId: string) => {
  try {
    const collectionRef = collection(db, "account-info");
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
