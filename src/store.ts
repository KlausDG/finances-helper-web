import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./concepts/Auth/store/authSlice";
import walletsReducer from "./concepts/Wallets/store/walletsSlice";
import accountSlice from "./concepts/Account/store/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountSlice,
    wallets: walletsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
