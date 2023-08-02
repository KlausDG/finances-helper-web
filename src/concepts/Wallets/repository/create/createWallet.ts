import { collection, doc, setDoc } from "firebase/firestore";
import { Wallet } from "../../entities";
import { WalletProps } from "../../types";
import { db } from "@/services/firebase";

export const createWallet = async ({
  name,
  percentage,
  userId,
}: WalletProps) => {
  const wallet = new Wallet({ name, percentage, userId });

  const collectionRef = collection(db, "wallets");

  try {
    const documentRef = doc(collectionRef, wallet.id);
    await setDoc(documentRef, { ...wallet });
  } catch (error) {
    console.error(error);
  }
};
