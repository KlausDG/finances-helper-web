import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../types";

const initialState: JournalState = [];

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setJournalEntries: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setJournalEntries } = journalSlice.actions;

export default journalSlice.reducer;
