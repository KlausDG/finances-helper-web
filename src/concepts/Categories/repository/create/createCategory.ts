import { db } from "@/services/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../types";

export const createCategory = async (
  categoryData: Omit<Category, "id">,
  userId: string
) => {
  const category = {
    ...categoryData,
    id: uuidv4(),
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
    userId,
  };

  const collectionRef = collection(db, "categories");

  try {
    const documentRef = doc(collectionRef, category.id);
    await setDoc(documentRef, category);
  } catch (error) {
    console.error(error);
  }
};
