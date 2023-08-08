import { db } from "@/services/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Wallet } from "../../types";

export const updateWallet = (walletData: Wallet) => {
  const wallet = {
    ...walletData,
    lastUpdated: serverTimestamp(),
  };

  const colletionRef = collection(db, "wallets");

  try {
    const documentRef = doc(colletionRef, wallet.id);
    updateDoc(documentRef, wallet);
  } catch (error) {
    console.error(error);
  }
};
