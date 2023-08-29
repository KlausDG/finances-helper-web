import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { WalletProps } from "../../types";
import { db } from "@/services/firebase";
import { v4 as uuidv4 } from "uuid";
import { walletsCollection } from "../collection";

export const createWallet = async (walletData: Omit<WalletProps, "id">) => {
  const wallet = {
    ...walletData,
    id: uuidv4(),
    lastUpdated: serverTimestamp(),
  };

  const collectionRef = collection(db, walletsCollection);

  try {
    const documentRef = doc(collectionRef, wallet.id);
    await setDoc(documentRef, wallet);
  } catch (error) {
    console.error(error);
  }
};
