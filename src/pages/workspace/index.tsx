import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Workspace.module.scss";
import { HomeWorkspace } from "../../components/HomeWorkspace/HomeWorkspace";
import { AsideWorkspace } from "../../components/AsideWorkspace/AsideWorkspace";
import { AudioRecorder } from "../../components/AudioRecorder/AudioRecorder";
import { useState } from "react";
import { UploadFileView } from "../../components/UploadFileView/UploadFileView";
import { startRetrievingRecords } from "../../store/audioLogs/audioLogsThunks";
import { current } from "@reduxjs/toolkit";
import { SelectedRecord } from "../../components/SelectedRecord/SelectedRecord";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { uid, email, isAuth, currentScreen } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (uid && isAuth) dispatch(startRetrievingRecords());
  }, [uid]);

  useEffect(() => {
    if (!uid && !isAuth) router.push("/login");
  }, [uid]);

  return (
    <>
      {uid && isAuth && (
        <main className={styles.workspace}>
          <AsideWorkspace />
          {currentScreen === 0 && <HomeWorkspace />}
          {currentScreen === 1 && <AudioRecorder />}
          {currentScreen === 2 && <UploadFileView />}
          {currentScreen === 3 && <SelectedRecord />}
        </main>
      )}
    </>
  );
}
