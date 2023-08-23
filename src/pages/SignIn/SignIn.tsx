import { useAuth } from "@/concepts/Auth";
import { toast } from "react-hot-toast";

export const SignIn = () => {
  const { handleGoogleSignIn } = useAuth();

  const teste = () => {
    toast.error("clickou nessa merda");
    handleGoogleSignIn();
  };

  return (
    <div>
      <button onClick={teste}>Login</button>
    </div>
  );
};
