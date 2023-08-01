import { User as FirebaseUser } from "firebase/auth";
import { User } from "../../entities";

export type AuthenticatedUserType = FirebaseUser | null;
export type UserDocumentType = User | null;
