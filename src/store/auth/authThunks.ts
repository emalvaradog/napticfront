import { startRetrievingRecords } from "./../audioLogs/audioLogsThunks";
import { Dispatch } from "@reduxjs/toolkit";
import {
  logoutFirebaseUser,
  signInUserWithEmail,
  signInUserWithGoogle,
} from "../../firebase/authProviders.ts";
import { clearAudioRecords } from "../audioLogs/audioLogsSlice";
import { login, logout, validateCredentials } from "./authSlice";

export const validatingAuthCredentials = () => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());
    const result = await signInUserWithGoogle();
    // @ts-ignore
    dispatch(startRetrievingRecords());
    if (!result.ok) return dispatch(logout(result.error));

    dispatch(login(result));
  };
};

export const startEmailSignIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());

    const result = await signInUserWithEmail(email, password);

    if (!result.ok) return dispatch(logout(result.error));

    dispatch(login(result));
  };
};

export const startUserLogout = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebaseUser();
    dispatch(clearAudioRecords());
    dispatch(logout());
  };
};
