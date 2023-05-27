import { AuthState } from "@/interfaces/AuthInterfaces";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  currentScreen: WorkSpaceScreen.Home,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentScreen(state, { payload }) {
      state.currentScreen = payload;
    },
    clearAuthState: (state) => {
      state.currentScreen = WorkSpaceScreen.Home;
    },
  },
});

export const { setCurrentScreen, clearAuthState } = authSlice.actions;
