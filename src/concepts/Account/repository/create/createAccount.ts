import { User as FirebaseUserType } from "firebase/auth";
import { Account } from "../../entities";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { CollectionRef } from "@/types";

export const createAccount = async (
  authenticatedUser: FirebaseUserType,
  collectionRef: CollectionRef
) => {
  try {
    const account = new Account({
      userName: authenticatedUser.displayName,
      userId: authenticatedUser.uid,
      totalPercentage: {
        value: 0,
        lastUpdated: serverTimestamp(),
      },
    });

    const accountDocumentName = authenticatedUser.displayName?.replace(
      /\s/g,
      ""
    );

    const documentRef = doc(collectionRef, accountDocumentName);
    await setDoc(documentRef, { ...account });
  } catch (error) {
    console.log(error);
  }
};
