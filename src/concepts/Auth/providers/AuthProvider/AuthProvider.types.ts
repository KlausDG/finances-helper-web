export type AuthContextType = AuthContextReturn | undefined;

type AuthContextReturn = {
  handleGoogleSignIn: () => void;
};
