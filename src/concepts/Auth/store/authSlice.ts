import { createSlice } from "@reduxjs/toolkit";
import { AuthState, AuthenticatedUserPayload } from "../types";

const initialState: AuthState = {
  user: undefined,
  authCheckCompleted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthenticatedUser: (state, { payload }: AuthenticatedUserPayload) => {
      if (!payload) {
        state.user = null;
      } else {
        state.user = {
          email: payload.email,
          displayName: payload.displayName,
          photoURL: payload.photoURL,
          uid: payload.uid,
        };
      }
    },
    completeAuthCheck: (state) => {
      state.authCheckCompleted = true;
    },
  },
});

export const { setAuthenticatedUser, completeAuthCheck } = authSlice.actions;

export default authSlice.reducer;
