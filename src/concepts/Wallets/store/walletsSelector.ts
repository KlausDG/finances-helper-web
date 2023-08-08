import { WalletsState } from "../types";

export const walletsSelector = (state: { wallets: WalletsState }) =>
  state.wallets;
