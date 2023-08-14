import { db } from "@/services/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";

export const deleteCategory = async (categoryId: string) => {
  const colletionRef = collection(db, "categories");

  try {
    const walletRef = doc(colletionRef, categoryId);
    await deleteDoc(walletRef);
  } catch (error) {
    console.error(error);
  }
};
