export type AuthContextType = AuthContextReturn | undefined;

type AuthContextReturn = {
  handleGoogleSignIn: () => void;
  completeAuthCheck: () => void;
  authCheckComplete: boolean;
};
