import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { AuthenticatedUser } from "@/concepts/Auth";
import { accountCollection } from "../collection";

export const createAccount = async (
  authenticatedUser: NonNullable<AuthenticatedUser>
) => {
  try {
    const collectionRef = collection(db, accountCollection);

    const account = {
      userName: authenticatedUser.displayName,
      userId: authenticatedUser.uid,
      totalPercentage: {
        value: 0,
        lastUpdated: serverTimestamp(),
      },
    };

    const accountDocumentName = authenticatedUser!.email!;

    const documentRef = doc(collectionRef, accountDocumentName);
    await setDoc(documentRef, account);
  } catch (error) {
    console.log(error);
  }
};
