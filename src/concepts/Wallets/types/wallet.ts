import { Wallet } from "./../entities";

export type WalletProps = Omit<Wallet, "id">;
