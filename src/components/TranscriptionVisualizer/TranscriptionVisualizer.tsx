import React from "react";
import { toast } from "react-hot-toast";
import styles from "./styles.module.scss";
import { TranscriptTimestamp } from "@/interfaces/Record";

export function TranscriptionVisualizer({
  transcript,
  timestamps,
  changeAudioTime,
}: {
  transcript?: string;
  timestamps?: TranscriptTimestamp[];
  changeAudioTime: (time: number) => void;
}) {
  const [transcriptFormatted, setTranscriptFormatted] =
    React.useState<boolean>(false);

  const copyTextToClipboard = () => {
    if (transcript === "" || transcript === undefined)
      return toast.error("No hay transcripción para copiar");
    navigator.clipboard.writeText(transcript).then(() => {
      toast.success("Transcripción copiada");
    });
  };

  const formatTranscript = () => {
    setTranscriptFormatted((prev) => !prev);
  };

  const convertTimestamps = (number: number) => {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${secondsFormatted}`;
  };

  const formatTimestamps = (timestamp: TranscriptTimestamp) => {
    const { start, end } = timestamp;

    return `${convertTimestamps(start)} - ${convertTimestamps(end)}`;
  };

  return (
    <div className={styles.transcript} style={{ height: "100%" }}>
      <div className={styles.transcriptHeader}>
        <h1>Transcripción</h1>
        <div className={styles.transcriptHeaderButtons}>
          <div className={styles.item} onClick={formatTranscript}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="clock"
            >
              <path d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20ZM12,6a.99974.99974,0,0,0-1,1v4.749L9.61816,14.32666a1.00029,1.00029,0,0,0,1.76368.94434l1.5-2.79883A1.00586,1.00586,0,0,0,13,12V7A.99974.99974,0,0,0,12,6Z"></path>
            </svg>
          </div>
          <div className={styles.item} onClick={copyTextToClipboard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="copy"
            >
              <path d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z M11.5,3 L6.5,3 C6.22385763,3 6,3.22385763 6,3.5 L6,10.5 C6,10.7761424 6.22385763,11 6.5,11 L11.5,11 C11.7761424,11 12,10.7761424 12,10.5 L12,3.5 C12,3.22385763 11.7761424,3 11.5,3 Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.transcriptContent}>
        <div className={styles.transcriptContentText}>
          {transcriptFormatted ? (
            timestamps?.map((timestamp, index) => {
              return (
                <div key={index} className={styles.transcriptContentTextTime}>
                  <span
                    onClick={() => changeAudioTime(Math.floor(timestamp.start))}
                  >
                    {formatTimestamps(timestamp)}
                  </span>
                  <p>{timestamp.text}</p>
                </div>
              );
            })
          ) : (
            <p>{transcript}</p>
          )}
        </div>
      </div>
    </div>
  );
}
