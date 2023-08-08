import { AuthState } from "../types";

export const authSelector = (state: { auth: AuthState }) => state.auth;
