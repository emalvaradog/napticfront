import { AuthState, AuthStatus } from "@/interfaces/AuthInterfaces";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  uid: null,
  name: null,
  email: null,
  token: null,
  isAuth: false,
  authStatus: AuthStatus.NotAuthenticated,
  error: null,
  hasAccess: null,
  currentScreen: WorkSpaceScreen.Home,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.authStatus = AuthStatus.Authenticated;
      state.isAuth = true;
      state.uid = payload.uid;
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      state.hasAccess = payload.hasAccess;
    },
    logout: (state) => {
      state.authStatus = AuthStatus.NotAuthenticated;
      state.isAuth = false;
      state.uid = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.hasAccess = null;
      state.currentScreen = WorkSpaceScreen.Home;
    },
    validateCredentials: (state) => {
      state.authStatus = AuthStatus.Authenticating;
    },
    setCurrentScreen(state, { payload }) {
      state.currentScreen = payload;
    },
    setAccessStatus(state, { payload }) {
      state.hasAccess = payload;
    },
  },
});

export const {
  login,
  logout,
  validateCredentials,
  setCurrentScreen,
  setAccessStatus,
} = authSlice.actions;
