import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { audioRecordsSlice } from "./audioLogs/audioLogsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    records: audioRecordsSlice.reducer,
  },
});
