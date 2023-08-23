import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./concepts/Auth/store/authSlice";
import walletsReducer from "./concepts/Wallets/store/walletsSlice";
import accountSlice from "./concepts/Account/store/accountSlice";
import selectedWalletSlice from "./concepts/Wallets/store/selectedWalletSlice";
import categoriesSlice from "./concepts/Categories/store/categoriesSlice";
import salarySlice from "./concepts/Salary/store/salarySlice";
import journalSlice from "./concepts/Journal/store/journalSlice";
import selectedDateSlice from "./store/selectedDate";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountSlice,
    categories: categoriesSlice,
    salary: salarySlice,
    selectedWallet: selectedWalletSlice,
    wallets: walletsReducer,
    journal: journalSlice,
    selectedDate: selectedDateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
