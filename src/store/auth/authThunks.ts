import { Dispatch } from "redux";
import { startRetrievingRecords } from "./../audioLogs/audioLogsThunks";
import {
  // logoutFirebaseUser,
  // signInUserWithEmail,
  signInUserWithGoogle,
} from "../../firebase/authProviders.ts";
import { clearAudioRecords } from "../audioLogs/audioLogsSlice";
import { clearAuthState } from "./authSlice";
import { FirebaseAuth } from "@/firebase/config.ts";

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    const result = await signInUserWithGoogle();

    if (!result.ok) return startUserLogout();

    // @ts-ignore
    dispatch(startRetrievingRecords());
  };
};

// export const startEmailSignIn = (email: string, password: string) => {
//   return async (dispatch: Dispatch) => {

//     const result = await signInUserWithEmail(email, password);

//     if (!result.ok) return dispatch(logout(result.error));

//     dispatch(login(result));
//   };
// };

export const startUserLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(clearAuthState());
    dispatch(clearAudioRecords());
    await FirebaseAuth.signOut();
  };
};
