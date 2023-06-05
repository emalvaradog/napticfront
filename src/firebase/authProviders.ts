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

export const setUserData = async (uid: string) => {
  try {
    // TODO: check if user has stripe plan and set data
    const userData = {
      uid,
      plan: "personal",
      usedSeconds: 0,
      purchased: [],
      purchases: [],
    };

    await setDoc(doc(FirebaseDB, "users", uid), userData);
  } catch (error) {}
};

export const logoutFirebaseUser = async () => {
  return await FirebaseAuth.signOut();
};
