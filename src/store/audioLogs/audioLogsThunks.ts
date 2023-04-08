import {
  pushNewAudioRecord,
  setAudioRecords,
  setAudioStatusError,
  setLoadingAudiosStatus,
  setSelectedRecord,
} from "./audioLogsSlice";
import {
  createNewRecord,
  getUserRecords,
  uploadFile2Storage,
} from "../../firebase/storageProviders";
import { setCurrentScreen } from "../auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { Dispatch } from "redux";

const SERVER_URL = "https://127.0.0.1:8080/upload";

export const startRetrievingRecords = () => {
  return async (dispatch: Dispatch, getState) => {
    const { uid } = getState().auth;

    dispatch(setLoadingAudiosStatus());

    try {
      const docs = await getUserRecords(uid);
      dispatch(setAudioRecords(docs));
    } catch (error: any) {
      dispatch(setAudioStatusError(error.message));
      console.log(error);
    }
  };
};

export const startCreatingNewRecord = ({
  title = "Nueva grabación",
  audioFile,
}) => {
  return async (dispatch: Dispatch, getState) => {
    const { uid } = getState().auth;
    dispatch(setLoadingAudiosStatus());

    try {
      const fileUrl = await uploadFile2Storage(audioFile);

      const newRecordData = {
        title,
        audios: [fileUrl],
        uploadedBy: uid,
        creationDate: new Date().toUTCString(),
      };

      const recordId = await createNewRecord(newRecordData);

      const formData = new FormData();
      formData.append("audio_file", audioFile);
      formData.append("user_uid", uid);
      formData.append("record_id", recordId);

      dispatch(pushNewAudioRecord({ ...newRecordData, id: recordId }));

      fetch(SERVER_URL, {
        method: "POST",
        body: formData,
      }).then((response) => {
        dispatch(setCurrentScreen(WorkSpaceScreen.selectedRecord));
      }); 

    } catch (error) {}

    setTimeout(() => {
      console.log("Loading");
    }, 2000);
  };
};

export const startSettingCurrentRecord = (id: string) => {
  return async (dispatch: Dispatch, getState) => {
    const { audioRecords } = getState().records;

    const selectedRecord = audioRecords.find((element) => element.id === id);

    dispatch(setSelectedRecord(selectedRecord));
    dispatch(setCurrentScreen(WorkSpaceScreen.selectedRecord));
  };
};
