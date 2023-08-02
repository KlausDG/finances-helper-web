import { createContext, useState } from "react";
import { WithChildren } from "@/types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { AuthContextType, AuthenticatedUserType } from "./AuthProvider.types";
import { createAccount } from "@/concepts/Account";
import { collection } from "firebase/firestore";

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }: WithChildren) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUserType>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const accountInfoCollectionRef = collection(db, "account-info");
        createAccount(result.user, accountInfoCollectionRef);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAuthenticatedUser = (user: AuthenticatedUserType) => {
    setAuthenticatedUser(user);
  };

  const completeAuthCheck = () => {
    setAuthCheckComplete(true);
  };

  const value = {
    authenticatedUser,
    handleAuthenticatedUser,
    handleGoogleSignIn,
    authCheckComplete,
    completeAuthCheck,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
