import { createAccount } from "@/concepts/Account";
import { auth } from "@/services/firebase";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
      .then((result) => {
        toast.error(result?.user?.uid || "merda nenhuma");
        if (result) {
          createAccount(result.user);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return {
    handleGoogleSignIn,
  };
};
