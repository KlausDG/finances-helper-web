import { createSlice } from "@reduxjs/toolkit";
import { WalletsState } from "../types";

const initialState: WalletsState = {
  availableWallets: [],
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState: initialState,
  reducers: {},
});

// export const { setAuthenticatedUser, completeAuthCheck } = authSlice.actions;

export default walletsSlice.reducer;
