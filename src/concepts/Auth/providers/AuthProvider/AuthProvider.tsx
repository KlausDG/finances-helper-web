import { createContext, useState } from "react";
import { WithChildren } from "@/types";
import {
  GoogleAuthProvider,
  User as FirebaseUserType,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { User } from "@/concepts/User";
import { AuthContextType } from "./AuthProvider.types";

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }: WithChildren) => {
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        createNewUserDocument(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewUserDocument = async (authenticatedUser: FirebaseUserType) => {
    try {
      const userCollectionRef = collection(db, "users");

      const user = new User({
        name: authenticatedUser.displayName,
        id: authenticatedUser.uid,
        totalAccountPercentage: {
          value: 0,
          lastUpdated: serverTimestamp(),
        },
      });

      const userDocumentName = authenticatedUser.displayName?.replace(
        /\s/g,
        ""
      );

      const userRef = doc(userCollectionRef, userDocumentName);

      await setDoc(userRef, user);
    } catch (error) {
      console.log(error);
    }
  };

  const completeAuthCheck = () => {
    setAuthCheckComplete(true);
  };

  const value = { handleGoogleSignIn, authCheckComplete, completeAuthCheck };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
