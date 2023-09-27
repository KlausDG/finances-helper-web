import { createSlice } from "@reduxjs/toolkit";
import { CurrentWalletsState } from "../types";

const initialState = [] as CurrentWalletsState;

const currentWalletsDataSlice = createSlice({
  name: "currentWalletsData",
  initialState,
  reducers: {
    setCurrentWalletsData: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setCurrentWalletsData } = currentWalletsDataSlice.actions;

export default currentWalletsDataSlice.reducer;
