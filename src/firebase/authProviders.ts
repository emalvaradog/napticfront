import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseAuth, FirebaseDB } from "./config";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signInUserWithGoogle = async () => {
  try {
    const user = await signInWithPopup(FirebaseAuth, googleProvider);

    return {
      ok: true,
      user: user.user,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

// export const signInUserWithEmail = async (
//   userEmail: string,
//   password: string
// ) => {
//   try {
//     const result = await signInWithEmailAndPassword(
//       FirebaseAuth,
//       userEmail,
//       password
//     );

//     const { uid, email, displayName } = result.user;

//     return {
//       ok: true,
//       uid,
//       displayName,
//       email,
//     };
//   } catch (error: any) {
//     return {
//       ok: false,
//       error: error.message,
//     };
//   }
// };

export const userHasAccess = async (uid: string) => {
  try {
    const userRef = doc(FirebaseDB, "users", uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists();
  } catch (error) {
    return false;
  }
};

export const userExists = async (uid: string) => {
  try {
    const userRef = doc(FirebaseDB, "users", uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists();
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const setUserPlanData = async (uid: string) => {
  try {
    // TODO: check if user has stripe plan and set data
    const userData = {
      uid,
      plan: "free",
      creationDate: new Date().getTime(),
      secondsLeft: 0,
      purchased: [],
      purchases: [],
    };

    await setDoc(doc(FirebaseDB, "users", uid), userData);
    return userData;
  } catch (error) {}
};

export const getUserData = async (uid: string) => {
  const userRef = doc(FirebaseDB, "users", uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

export const logoutFirebaseUser = async () => {
  return await FirebaseAuth.signOut();
};
