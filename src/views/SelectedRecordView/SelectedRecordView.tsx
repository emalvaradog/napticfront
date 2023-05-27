import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader/Loader";
import {
  AudioVisualizer,
  NapticChatBot,
  TranscriptionVisualizer,
} from "@/components";
import { startUpdatingTitleRecord } from "@/store/audioLogs/audioLogsThunks";
import { setCurrentScreen } from "@/store/auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";

export function SelectedRecordView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedRecord, audiosStatus } = useSelector(
    (state: RootState) => state.records
  );

  const checkRef = useRef(null);

  const [inputTitle, setInputTitle] = useState(selectedRecord?.title);
  const [audioTime, setAudioTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Function to format date to dd mmm yyyy
  const formatDate = (date: string | undefined) => {
    if (date) {
      const dateArr = date.split(" ");
      const dateFormatted = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
      return dateFormatted;
    }
  };

  // Function to change starting audio time
  const changeAudioTime = (time: number) => {
    setAudioTime(time);
  };

  // Function to handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const setNewTitle = () => {
    setIsEditing(false);
    if (inputTitle !== selectedRecord?.title) {
      // @ts-ignore
      dispatch(startUpdatingTitleRecord(inputTitle, selectedRecord?.id));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setInputTitle(selectedRecord?.title);
  };

  // Change title when selected record changes
  useEffect(() => {
    if (!selectedRecord) {
      dispatch(setCurrentScreen(WorkSpaceScreen.Home));
    }
    setInputTitle(selectedRecord?.title);
  }, [selectedRecord]);

  return (
    <section className={styles.section}>
      {audiosStatus === "loading" ? (
        <Loader status={audiosStatus} />
      ) : !selectedRecord?.transcription ? (
        <Loader status={"!transcription"} />
      ) : (
        <>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionTitleEdit}>
              <input
                value={inputTitle}
                onFocus={() => setIsEditing(true)}
                onChange={handleTitleChange}
              />
              {isEditing && (
                <div className={styles.sectionTitleEditBtns}>
                  <svg
                    onClick={setNewTitle}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    id="check"
                    ref={checkRef}
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <polyline
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      points="216 72.005 104 184 48 128.005"
                    ></polyline>
                  </svg>
                  <svg
                    onClick={handleCancelEdit}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="cancel"
                  >
                    <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                  </svg>
                </div>
              )}
            </div>
            <p>{formatDate(selectedRecord?.creationDate)}</p>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionContainerAudio}>
              <AudioVisualizer
                src={selectedRecord?.audios[0]}
                audioTime={audioTime}
              />
            </div>
            <div className={styles.sectionContainerTranscription}>
              <TranscriptionVisualizer
                transcript={selectedRecord?.transcription.text}
                timestamps={selectedRecord?.transcription.timestamps}
                changeAudioTime={changeAudioTime}
              />
            </div>
            <div className={styles.sectionContainerChat}>
              <NapticChatBot
                chat={selectedRecord?.chat}
                recordId={selectedRecord?.id}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
