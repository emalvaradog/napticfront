import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "./config";

export const getUserRecords = async (uid) => {
  const documents = [];
  const recordsRef = collection(FirebaseDB, `records`);
  const q = query(recordsRef, where("uploadedBy", "==", uid));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    documents.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return documents;
};

export const createNewRecord = async (newRecordData) => {
  const newRecordRef = doc(collection(FirebaseDB, "records"));

  newRecordData["id"] = newRecordRef.id;

  await setDoc(newRecordRef, newRecordData);

  return newRecordRef.id;
};

export const uploadFile2Storage = async (file) => {
  const storageRef = ref(FirebaseStorage, "audio_files/" + file.name);
  try {
    const uploadTask = await uploadBytes(storageRef, file);
    const fileLocation = await getDownloadURL(uploadTask.ref);
    return fileLocation;
  } catch (error) {
    console.log(error);
  }
};
