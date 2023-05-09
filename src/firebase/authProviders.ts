import { doc, getDoc } from "firebase/firestore/lite";
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
    await signInWithPopup(FirebaseAuth, googleProvider);

    return {
      ok: true,
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

export const logoutFirebaseUser = async () => {
  return await FirebaseAuth.signOut();
};
