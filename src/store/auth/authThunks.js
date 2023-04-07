import {
  logoutFirebaseUser,
  signInUserWithEmail,
  signInUserWithGoogle,
} from "../../firebase/authProviders";
import { clearAudioRecords } from "../audioLogs/audioLogsSlice";
import { login, logout, validateCredentials } from "./authSlice";

export const validatingAuthCredentials = () => {
  return async (dispatch) => {
    dispatch(validateCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(validateCredentials());
    const result = await signInUserWithGoogle();
    if (!result.ok) return dispatch(logout(result.error));

    dispatch(login(result));
  };
};

export const startEmailSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(validateCredentials());

    const result = await signInUserWithEmail(email, password);

    if (!ok) return dispatch(logout(result.error));

    dispatch(login(result));
  };
};

export const startUserLogout = () => {
  return async (dispatch) => {
    await logoutFirebaseUser();
    dispatch(logout());
    dispatch(clearAudioRecords());
    // TODO: Clear redux store
  };
};
