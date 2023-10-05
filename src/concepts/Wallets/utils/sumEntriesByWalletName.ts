import { JournalEntry } from "@/concepts/Journal";

export const sumEntriesByWalletName = (
  walletName: string,
  journalEntries: Array<JournalEntry>
) => {
  return journalEntries.reduce((acc, entry) => {
    const wallet = entry.category?.wallet;
    if (wallet?.name === walletName) {
      acc += entry.total;
    }
    return acc;
  }, 0);
};
