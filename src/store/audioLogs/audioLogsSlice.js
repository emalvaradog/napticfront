import { createSlice } from "@reduxjs/toolkit";

// let timestamp = {
//   start: Number,
//   content: String,
// };

// let logType = {
//   id: "id",
//   audios: ["url"],
//   chatHistory: [{ role: "user/assistant", content: "message" }],
//   transcription: { text: "text", timestamps: [timestamp] },
//   uploadedBy: "uid",
//   title: "title",
//   creationDate: "date",
// };

// let audioRecords = [{ logType }];

const initialState = {
  audioRecords: [], // array with audio objects
  selectedRecord: null, // log type object
  audiosStatus: null, // loading, loaded, error
};

export const audioRecordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setAudioRecords: (state, { payload }) => {
      state.audiosStatus = "loaded";
      state.audioRecords = payload;
    },
    setSelectedRecord: (state, { payload }) => {
      state.selectedRecord = payload;
    },
    addAudioRecord: (state, { payload }) => {
      state.audioRecords.push(payload);
    },
    setLoadingAudiosStatus: (state) => {
      state.audiosStatus = "loading";
    },
    clearAudioRecords: (state) => {
      state.audioRecords = [];
      state.selectedRecord = null;
      state.audiosStatus = null;
    },
    setAudioStatusError: (state, { payload }) => {
      state.audiosStatus = payload;
    },
    pushNewAudioRecord: (state, { payload }) => {
      state.audioRecords.push(payload);
    },
    clearAudioRecords: (state) => {
      state.audioRecords = [];
      state.selectedRecord = null;
      state.audiosStatus = null;
    },
  },
});

export const {
  setAudioRecords,
  setSelectedRecord,
  setLoadingAudiosStatus,
  addAudioRecord,
  pushNewAudioRecord,
  setAudioStatusError,
  clearAudioRecords,
} = audioRecordsSlice.actions;
