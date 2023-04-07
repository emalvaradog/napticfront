import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./auth/authSlice";
import { audioRecordsSlice } from "./audioLogs/audioLogsSlice";

export const store = configureStore({
  reducer: {
    auth: counterSlice.reducer,
    records: audioRecordsSlice.reducer,
  },
});
