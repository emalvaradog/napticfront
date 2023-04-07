import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  name: null,
  email: null,
  token: null,
  isAuth: false,
  authStatus: "not-authenticated", // not-authenticated, authenticating, authenticated, error
  error: null,
  currentScreen: 0,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.authStatus = "authenticated";
      state.isAuth = true;
      state.uid = payload.uid;
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
    },
    logout: (state, { payload }) => {
      state.authStatus = "not-authenticated";
      state.isAuth = false;
      state.uid = null;
      state.name = null;
      state.email = null;
      state.token = null;
    },
    validateCredentials: (state, { payload }) => {
      state.authStatus = "authenticating";
    },
    setCurrentScreen(state, { payload }) {
      state.currentScreen = payload;
    },
  },
});

export const { login, logout, validateCredentials, setCurrentScreen } =
  counterSlice.actions;
