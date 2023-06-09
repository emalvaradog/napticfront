import { Dispatch } from "redux";
import { startRetrievingRecords } from "./../audioLogs/audioLogsThunks";
import {
  // logoutFirebaseUser,
  // signInUserWithEmail,
  signInUserWithGoogle,
  userExists,
  getUserData,
  userHasAccess,
  setUserPlanData,
} from "../../firebase/authProviders.ts";
import { clearAudioRecords } from "../audioLogs/audioLogsSlice";
import { clearAuthState, setUserData } from "./authSlice";
import { FirebaseAuth } from "@/firebase/config.ts";

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    const result = await signInUserWithGoogle();
    let userPlanData;

    if (!result.ok) return startUserLogout();

    // @ts-ignore
    dispatch(startRetrievingRecords(result.user.uid));
  };
};

// export const startEmailSignIn = (email: string, password: string) => {
//   return async (dispatch: Dispatch) => {
//     const result = await signInUserWithEmail(email, password);
//     if (!result.ok) return dispatch(logout(result.error));
//     dispatch(login(result));
//   };
// };

export const startUserPlanValidation = (uid: string) => {
  return async (dispatch: Dispatch) => {
    // @ts-ignore
    if (!(await userExists(uid))) {
      console.log("user with uid " + uid + " does not exist");
      // @ts-ignore
      await setUserPlanData(uid);
    }

    // @ts-ignore
    const userPlanData = await getUserData(uid);

    dispatch(
      setUserData({
        // @ts-ignore
        userPlan: userPlanData.plan,

        // @ts-ignore
        secondsLeft: userPlanData.secondsLeft,
      })
    );
  };
};

export const startUserLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(clearAuthState());
    dispatch(clearAudioRecords());
    await FirebaseAuth.signOut();
  };
};
