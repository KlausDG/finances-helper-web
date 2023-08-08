import { createAccount } from "@/concepts/Account";
import { auth } from "@/services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useAuth = () => {
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

  return {
    handleGoogleSignIn,
  };
};
