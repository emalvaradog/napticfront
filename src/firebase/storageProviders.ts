import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "./config";
import { Message, Record } from "@/interfaces/Record";

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

export const updateRecordChat = async (recordId: string, chat: Message) => {
  try {
    const recordRef = doc(FirebaseDB, "records", recordId);
    await updateDoc(recordRef, { chat });
    return true;
  } catch (error) {
    return false;
  }
};

export const getRecordFromId = async (recordId: string) => {
  try {
    const recordRef = doc(FirebaseDB, "records", recordId);
    const recordDoc = await getDoc(recordRef);
    if (recordDoc.exists()) {
      return recordDoc.data();
    }
  } catch (e) {
    console.log(e);
  }
};
