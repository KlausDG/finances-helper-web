export type Wallet = WalletProps & {
  id: string;
};

export type WalletProps = {
  name: string;
  percentage: string;
  userId: string;
};

export type WalletsState = {
  availableWallets: Array<Wallet>;
};
