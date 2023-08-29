import { db } from "@/services/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { walletsCollection } from "../collection";

export const deleteWallet = async (walletId: string) => {
  const colletionRef = collection(db, walletsCollection);

  try {
    const walletRef = doc(colletionRef, walletId);
    await deleteDoc(walletRef);
  } catch (error) {
    console.error(error);
  }
};
