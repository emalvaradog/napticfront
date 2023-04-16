import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader/Loader";
import {
  AudioVisualizer,
  NapticChatBot,
  TranscriptionVisualizer,
} from "@/components";

export function SelectedRecordView() {
  const router = useRouter();
  const { selectedRecord, audiosStatus } = useSelector(
    (state: RootState) => state.records
  );
  const [textTimestamps, setTextTimestamps] = useState("");

  const formatDate = (date: string | undefined) => {
    if (date) {
      const dateArr = date.split(" ");
      const dateFormatted = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
      return dateFormatted;
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // @ts-ignore
    // dispatch(startUpdatingRecordTitle(selectedRecord?.id, e.target.value));
  };

  useEffect(() => {
    if (!selectedRecord) {
      router.push("/workspace");
    }
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
            <textarea
              rows={1}
              value={selectedRecord?.title}
              onChange={handleTitleChange}
            ></textarea>
            <p>{formatDate(selectedRecord?.creationDate)}</p>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionContainerAudio}>
              <AudioVisualizer src={selectedRecord?.audios[0]} />
            </div>
            <div className={styles.sectionContainerTranscription}>
              <TranscriptionVisualizer
                transcript={selectedRecord?.transcription.text}
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
