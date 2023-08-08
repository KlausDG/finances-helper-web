import { User } from "firebase/auth";

export type AuthenticatedUser =
  | Pick<User, "email" | "displayName" | "photoURL" | "uid">
  | undefined;

export type AuthenticatedUserPayload = {
  payload: User | null;
};
