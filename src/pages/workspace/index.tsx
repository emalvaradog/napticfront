import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Workspace.module.scss";
import { HomeWorkspace } from "../../components/HomeWorkspace/HomeWorkspace";
import { AsideWorkspace } from "../../components/AsideWorkspace/AsideWorkspace";
import { AudioRecorder } from "../../components/AudioRecorder/AudioRecorder";
import { useState } from "react";
import { UploadFileView } from "@/components/UploadFileView/UploadFileView";
import { startRetrievingRecords } from "../../store/audioLogs/audioLogsThunks";
import { current } from "@reduxjs/toolkit";
import { SelectedRecord } from "@/components/SelectedRecord/SelectedRecord";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { RootState } from "@/store/store";

export default function Index() {
  const router = useRouter();

  const { uid, email, isAuth } = useSelector((state: RootState) => state.auth);

  const currentScreen: WorkSpaceScreen = useSelector(
    (state: RootState) => state.auth.currentScreen
  ) as WorkSpaceScreen;

  useEffect(() => {
    if (!uid && !isAuth) router.push("/login");
  }, [uid]);

  return (
    <>
      {uid && isAuth && (
        <main className={styles.workspace}>
          <AsideWorkspace />
          {currentScreen === WorkSpaceScreen[WorkSpaceScreen.Home] && (
            <HomeWorkspace />
          )}
          {currentScreen === WorkSpaceScreen.Record && <AudioRecorder />}
          {currentScreen === WorkSpaceScreen.Upload && <UploadFileView />}
          {currentScreen === WorkSpaceScreen.SelectedRecord && (
            <SelectedRecord />
          )}
        </main>
      )}
    </>
  );
}
