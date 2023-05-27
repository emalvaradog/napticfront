import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { FirebaseDB, FirebaseStorage } from "./config";
import { Message, Record } from "@/interfaces/Record";

const JWT_SECRET = "naptic-secret-jwt-key";

export const getUserRecords = async (uid: string) => {
  const documents = [] as Record[];
  const recordsRef = collection(FirebaseDB, `records`);
  const q = query(recordsRef, where("uploadedBy", "==", uid));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // @ts-ignore
    documents.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return documents;
};

export const uploadUserToken = async (uid: string) => {
  const time = Date.now();

  // @ts-ignore
  const token = String(time);

  const data = {
    token,
    time,
    uid,
  };

  await setDoc(doc(FirebaseDB, "tokens", token), data);

  return token;
};

export const createNewRecord = async (newRecordData: Record) => {
  const newRecordRef = doc(collection(FirebaseDB, "records"));

  newRecordData["id"] = newRecordRef.id;

  await setDoc(newRecordRef, newRecordData);

  return newRecordRef.id;
};

export const uploadFile2Storage = async (file: File) => {
  const storageRef = ref(FirebaseStorage, "audio_files/" + file.name);
  try {
    const uploadTask = await uploadBytes(storageRef, file);
    const fileLocation = await getDownloadURL(uploadTask.ref);
    return fileLocation;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecordChat = async (
  recordId: string,
  chatMessage: Message
) => {
  try {
    const recordRef = doc(FirebaseDB, "records", recordId);
    await updateDoc(recordRef, { chat: arrayUnion(chatMessage) });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateRecordTitle = async (
  recordId: string,
  newRecordTitle: string
) => {
  try {
    const recordRef = doc(FirebaseDB, "records", recordId);
    await updateDoc(recordRef, { title: newRecordTitle });
    return true;
  } catch (error) {
    return false;
  }
};

export const getRecordFromId = async (recordId: string) => {
  const recordRef = doc(FirebaseDB, "records", recordId);
  const recordDoc = await getDoc(recordRef);

  if (recordDoc.exists()) {
    return recordDoc.data();
  } else {
    return null;
  }
};

export const deleteRecord = async (recordId: string) => {
  try {
    const recordRef = doc(FirebaseDB, "records", recordId);
    return await deleteDoc(recordRef);
  } catch (error) {
    return error;
  }
};
