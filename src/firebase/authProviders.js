import { FirebaseAuth } from "./config";
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
    // TODO: Implement session/local persistance
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { uid, email, displayName } = result.user;

    return {
      ok: true,
      uid,
      displayName,
      email,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const signInUserWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, email, displayName } = result.user;

    return {
      ok: true,
      uid,
      displayName,
      email,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const logoutFirebaseUser = async () => {
  return await FirebaseAuth.signOut();
};
