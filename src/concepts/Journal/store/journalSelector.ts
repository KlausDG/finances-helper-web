import { JournalState } from "../types";

export const journalSelector = (state: { journal: JournalState }) =>
  state.journal;
