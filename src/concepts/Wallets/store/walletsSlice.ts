import { createSlice } from "@reduxjs/toolkit";
import { WalletsState } from "../types";

const initialState: WalletsState = [];

const walletsSlice = createSlice({
  name: "wallets",
  initialState: initialState,
  reducers: {
    setWallets: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setWallets } = walletsSlice.actions;

export default walletsSlice.reducer;
