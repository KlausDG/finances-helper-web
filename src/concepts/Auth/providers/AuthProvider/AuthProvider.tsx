import { createContext } from "react";
import { WithChildren } from "@/types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/services/firebase";
import { AuthContextType } from "./AuthProvider.types";
import { createAccount } from "@/concepts/Account";

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }: WithChildren) => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        createAccount(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    handleGoogleSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
