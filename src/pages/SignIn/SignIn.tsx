import { useAuth } from "@/concepts/Auth";

export const SignIn = () => {
  const { handleGoogleSignIn } = useAuth();

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Login</button>
    </div>
  );
};
