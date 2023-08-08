import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getAccount = async (docName: string) => {
  const docRef = doc(db, "account-info", docName);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    return null;
  }
};
