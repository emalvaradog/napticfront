import { startRetrievingRecords } from "./../audioLogs/audioLogsThunks";
import { Dispatch } from "@reduxjs/toolkit";
import {
  logoutFirebaseUser,
  signInUserWithEmail,
  signInUserWithGoogle,
  userHasAccess,
} from "../../firebase/authProviders.ts";
import { clearAudioRecords } from "../audioLogs/audioLogsSlice";
import {
  login,
  logout,
  setAccessStatus,
  validateCredentials,
} from "./authSlice";
import { useRouter } from "next/router";

export const validatingAuthCredentials = () => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());
    const result = await signInUserWithGoogle();
    const { uid, displayName, email } = result;

    // @ts-ignore
    const userAccess = await userHasAccess(uid);

    if (!result.ok) return dispatch(logout());

    // if (!userAccess) return dispatch(logout());

    // @ts-ignore
    dispatch(startRetrievingRecords());
    dispatch(
      login({
        uid,
        name: displayName,
        email,
        token: uid,
        hasAccess: userAccess,
      })
    );
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
