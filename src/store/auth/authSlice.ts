import { AuthState } from "@/interfaces/AuthInterfaces";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  currentScreen: WorkSpaceScreen.Home,
  userPlan: null,
  secondsLeft: null,
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
    setUserData: (state, { payload }) => {
      state.userPlan = payload.userPlan;
      state.secondsLeft = payload.secondsLeft;
    },
  },
});

export const { setCurrentScreen, clearAuthState, setUserData } =
  authSlice.actions;
