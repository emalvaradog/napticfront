import {
  pushNewAudioRecord,
  setAudioRecords,
  setAudioStatusError,
  setAudiosStatus,
  setSelectedRecord,
  updateSelectedRecordChat,
} from "./audioLogsSlice";

import {
  createNewRecord,
  deleteRecord,
  getRecordFromId,
  getUserRecords,
  updateRecordChat,
  updateRecordTitle,
  uploadFile2Storage,
  uploadUserToken,
} from "../../firebase/storageProviders";

import { setCurrentScreen } from "../auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { Message, Record } from "@/interfaces/Record";
import { onSnapshot, doc } from "firebase/firestore";
import { FirebaseDB } from "@/firebase/config";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const startRetrievingRecords = (uid: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setAudiosStatus("loading"));

    try {
      if (uid) {
        try {
          const docs = await getUserRecords(uid);
          dispatch(setAudioRecords(docs));
        } catch (error) {
          dispatch(setAudioStatusError());
          console.log(error);
        }
      }
    } catch (error: any) {
      dispatch(setAudioStatusError());
      console.log(error);
    }
  };
};

export const startCreatingNewRecord = ({
  title = "Título grabación",
  audioFile,
  uid,
}: {
  title: string;
  audioFile: File;
  uid: string;
}) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAudiosStatus("loading"));
    const fileLocation = await uploadFile2Storage(audioFile);

    try {
      const newRecordData = {
        id: "",
        title,
        audios: [fileLocation],
        uploadedBy: uid,
        creationDate: new Date().toString(),
        chat: [],
        transcription: { text: "", timestamps: [] },
      } as Record;

      const recordId = await createNewRecord(newRecordData);

      const formData = new FormData();

      // @ts-ignore
      const token = await uploadUserToken(uid);

      if (audioFile && uid && recordId) {
        formData.append("user_uid", uid);
        formData.append("record_id", recordId);
        formData.append("token", token);
      }

      if (API_URL) {
        fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            // @ts-ignore
            getRecordFromId(recordId).then((record) => {
              dispatch(pushNewAudioRecord(record));
              dispatch(setSelectedRecord(record));
              dispatch(setAudiosStatus("loaded"));
              dispatch(setCurrentScreen(WorkSpaceScreen.SelectedRecord));
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch(setAudioStatusError());
          });
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setAudioStatusError());
    }
  };
};

export const startSettingCurrentRecord = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(setAudiosStatus("loading"));
      const { audioRecords } = getState().records;

      let selectedRecord;

      audioRecords.map((record) => {
        if (record.id === id) {
          selectedRecord = record;
        }
      });

      dispatch(setSelectedRecord(selectedRecord));
      dispatch(setCurrentScreen(WorkSpaceScreen.SelectedRecord));
      dispatch(setAudiosStatus(""));
    } catch (error: any) {
      dispatch(setAudioStatusError(error.message));
    }
  };
};

export const startUpdatingChatRecord = (chatMessage: Message) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const selectedRecord = getState().records.selectedRecord;
    if (selectedRecord) {
      dispatch(updateSelectedRecordChat(chatMessage));
      await updateRecordChat(selectedRecord.id, chatMessage);
    }
  };
};

export const startDeletingRecord = (recordId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { audioRecords, selectedRecord } = getState().records;
    try {
      try {
        dispatch(setAudiosStatus("loading"));
        await deleteRecord(recordId);

        // @ts-ignore
        if (selectedRecord.id === recordId) {
          dispatch(setSelectedRecord(null));
          dispatch(setCurrentScreen(WorkSpaceScreen.Home));
        }

        const updatedRecords = audioRecords.filter(
          (record) => record.id !== recordId
        );

        dispatch(setAudioRecords(updatedRecords));
      } catch (error) {
        dispatch(setAudioStatusError());
      }
    } catch (error) {
      console.log(error);
      setAudiosStatus("error");
    }
  };
};

export const startUpdatingTitleRecord = (title: string, recordId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { audioRecords, selectedRecord } = getState().records;
    try {
      const newRecords = audioRecords.map((record) => {
        if (record.id === recordId) {
          return { ...record, title };
        }
        return record;
      });

      dispatch(setAudioRecords(newRecords));
      await updateRecordTitle(recordId, title);
    } catch (error) {
      console.log(error);
      setAudiosStatus("error");
    }
  };
};
