import { createSlice } from "@reduxjs/toolkit";
import { AccountState, TotalPercentage } from "../types";

const initialState: AccountState = {
  userId: "",
  userName: "",
  totalPercentage: {} as TotalPercentage,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setAccount: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
