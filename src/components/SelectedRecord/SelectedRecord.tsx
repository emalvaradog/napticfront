import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { NapticChatBot } from "../NapticChatBot/NapticChatBot";
import { AudioVisualizer } from "../AudioVisualizer/AudioVisualizer";
import { TranscriptionVisualizer } from "../TranscriptionVisualizer/TranscriptionVisualizer";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { Loader } from "../Loader/Loader";

export function SelectedRecord() {
  const router = useRouter();
  const { selectedRecord, audiosStatus } = useSelector(
    (state: RootState) => state.records
  );
  const [textTimestamps, setTextTimestamps] = useState("");

  useEffect(() => {
    if (!selectedRecord) {
      router.push("/workspace");
    }
  }, [selectedRecord]);

  return (
    <section className={styles.section}>
      {audiosStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className={styles.sectionTitle}>
            <h1>{selectedRecord?.title}</h1>
            <p>{selectedRecord?.creationDate.toString()}</p>
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
