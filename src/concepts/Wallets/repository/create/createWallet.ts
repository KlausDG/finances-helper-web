import { collection, doc, setDoc } from "firebase/firestore";
import { WalletProps } from "../../types";
import { db } from "@/services/firebase";
import { v4 as uuidv4 } from "uuid";

export const createWallet = async (walletData: WalletProps) => {
  const wallet = {
    id: uuidv4(),
    ...walletData,
  };

  const collectionRef = collection(db, "wallets");

  try {
    const documentRef = doc(collectionRef, wallet.id);
    await setDoc(documentRef, wallet);
  } catch (error) {
    console.error(error);
  }
};
