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
  getRecordFromId,
  getUserRecords,
  updateRecordChat,
  uploadFile2Storage,
} from "../../firebase/storageProviders";
import { setCurrentScreen } from "../auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { Message, Record } from "@/interfaces/Record";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const startRetrievingRecords = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    dispatch(setAudiosStatus("loading"));

    try {
      if (uid) {
        const docs = await getUserRecords(uid);
        dispatch(setAudioRecords(docs));
      }
    } catch (error: any) {
      dispatch(setAudioStatusError(error.message));
      console.log(error);
    }
  };
};

export const startCreatingNewRecord = ({
  title = "Nueva grabación",
  audioFile,
}: {
  title: string;
  audioFile: File;
}) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    dispatch(setAudiosStatus("loading"));

    try {
      const fileUrl = await uploadFile2Storage(audioFile);
      const newRecordData = {
        id: "",
        title,
        audios: [fileUrl],
        uploadedBy: uid,
        creationDate: new Date().toString(),
        chat: [],
        transcription: { text: "", timestamps: [] },
      } as Record;

      const recordId = await createNewRecord(newRecordData);
      const formData = new FormData();

      if (audioFile && uid && recordId) {
        formData.append("audio_file", audioFile);
        formData.append("user_uid", uid);
        formData.append("record_id", recordId);
      }

      if (API_URL) {
        fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {})
          .catch((error) => {
            console.log(error);
            dispatch(setAudioStatusError());
          });
      }

      dispatch(pushNewAudioRecord({ ...newRecordData, id: recordId }));
      dispatch(setAudiosStatus("loaded"));
      dispatch(setCurrentScreen(WorkSpaceScreen.SelectedRecord));
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
      const data = await getRecordFromId(id);

      audioRecords.map((record) => {
        if (data) {
          if (record.id === data.id) {
            return data;
          }
          return record;
        }
      });

      dispatch(setSelectedRecord(data));
      dispatch(setCurrentScreen(WorkSpaceScreen.SelectedRecord));
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
