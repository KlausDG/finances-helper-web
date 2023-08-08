import { AccountState } from "../types";

export const accountSelector = (state: { account: AccountState }) =>
  state.account;
