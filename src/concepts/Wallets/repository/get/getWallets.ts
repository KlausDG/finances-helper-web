import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getWallets = async () => {
  const docRef = doc(db, "wallets");

  try {
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data();
  } catch (error) {
    console.log(error);
  }
};
