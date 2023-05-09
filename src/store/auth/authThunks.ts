import { Dispatch } from "redux";
import { startRetrievingRecords } from "./../audioLogs/audioLogsThunks";
import {
  // logoutFirebaseUser,
  // signInUserWithEmail,
  signInUserWithGoogle,
} from "../../firebase/authProviders.ts";
import { clearAudioRecords } from "../audioLogs/audioLogsSlice";
import { validateCredentials } from "./authSlice";
import { FirebaseAuth } from "@/firebase/config.ts";
import { useAuthUser } from "next-firebase-auth";

export const validatingAuthCredentials = () => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(validateCredentials());
    const result = await signInUserWithGoogle();

    if (!result.ok) return startUserLogout();

    // @ts-ignore
    dispatch(startRetrievingRecords());
  };
};

// export const startEmailSignIn = (email: string, password: string) => {
//   return async (dispatch: Dispatch) => {
//     dispatch(validateCredentials());

//     const result = await signInUserWithEmail(email, password);

//     if (!result.ok) return dispatch(logout(result.error));

//     dispatch(login(result));
//   };
// };

export const startUserLogout = () => {
  return async (dispatch: Dispatch) => {
    await FirebaseAuth.signOut();
    dispatch(clearAudioRecords());
  };
};
