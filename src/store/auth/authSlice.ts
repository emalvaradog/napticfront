import { AuthState, AuthStatus } from "@/interfaces/AuthInterfaces";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  authStatus: AuthStatus.NotAuthenticated,
  currentScreen: WorkSpaceScreen.Home,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    validateCredentials: (state) => {
      state.authStatus = AuthStatus.Authenticating;
    },
    setCurrentScreen(state, { payload }) {
      state.currentScreen = payload;
    },
  },
});

export const { validateCredentials, setCurrentScreen } = authSlice.actions;
