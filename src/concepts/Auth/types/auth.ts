import { AuthenticatedUser } from ".";

export type AuthState = {
  user: AuthenticatedUser | null;
  authCheckCompleted: boolean;
};
