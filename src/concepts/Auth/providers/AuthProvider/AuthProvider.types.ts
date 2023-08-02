import { User as FirebaseUser } from "firebase/auth";

export type AuthContextType = AuthContextReturn | undefined;

export type AuthenticatedUserType = FirebaseUser | null;

type AuthContextReturn = {
  authenticatedUser: AuthenticatedUserType;
  handleAuthenticatedUser: (user: FirebaseUser | null) => void;
  handleGoogleSignIn: () => void;
  completeAuthCheck: () => void;
  authCheckComplete: boolean;
};
