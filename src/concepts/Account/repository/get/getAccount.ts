import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { accountCollection } from "../collection";

export const getAccount = async (docName: string) => {
  const docRef = doc(db, accountCollection, docName);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    return null;
  }
};
