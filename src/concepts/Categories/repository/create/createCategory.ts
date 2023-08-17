import { db } from "@/services/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { CategorySubmitData } from "../../types";
import toast from "react-hot-toast";

export const createCategory = async (
  categoryData: CategorySubmitData,
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
    toast.success("Categoria criada com sucesso!");
  } catch (error) {
    console.error(error);
  }
};
