import { createSlice } from "@reduxjs/toolkit";
import { Wallet } from "../types";
import { FieldValue } from "firebase/firestore";

const defaulWalletValues = {
  id: "",
  name: "",
  percentage: 0,
  userId: "",
  lastUpdated: {} as FieldValue,
};

const initialState: Wallet = defaulWalletValues;

const selectedWalletSlice = createSlice({
  name: "selectedWallet",
  initialState: initialState,
  reducers: {
    selectWallet: (_, { payload }) => {
      return payload;
    },
    clearSelectedWallet: () => {
      return defaulWalletValues;
    },
    updateSelectedWallet: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const { selectWallet, clearSelectedWallet, updateSelectedWallet } =
  selectedWalletSlice.actions;

export default selectedWalletSlice.reducer;
