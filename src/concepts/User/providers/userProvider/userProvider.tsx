import { createContext, useState } from "react";
import { WithChildren } from "@/types";
import { AuthenticatedUserType, UserDocumentType } from "./userProvider.types";

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }: WithChildren) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUserType>(null);
  const [userDocument, setUserDocument] = useState<UserDocumentType>(null);

  const value = {
    authenticatedUser,
    setAuthenticatedUser,
    userDocument,
    setUserDocument,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
