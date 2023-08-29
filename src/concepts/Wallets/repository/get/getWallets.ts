import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { walletsCollection } from "../collection";

export const getWallets = async () => {
  const docRef = doc(db, walletsCollection);

  try {
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data();
  } catch (error) {
    console.log(error);
  }
};
