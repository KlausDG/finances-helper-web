import { createContext, useState } from "react";
import { WithChildren } from "@/types";
import { LoadingProviderType } from "./loadingProvider.types";
import { Loading } from "@/components";

export const LoadingContext = createContext<LoadingProviderType>(undefined);

export const LoadingProvider = ({ children }: WithChildren) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const value = {
    loading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};
