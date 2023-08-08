export type LoadingProviderType = LoadingProviderReturn | undefined;

type LoadingProviderReturn = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};
