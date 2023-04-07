import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

const FETCH_URL = "http://127.0.0.1:8000/upload";

export function AudioRecorderSF({ handleNewRecord }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const { uid } = useSelector((state) => state.auth);

  const intervalRef = useRef(null);

  const handleFilesUpload = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

    const file = new File(
      [audioBlob],
      `${Date.now()}.${audioBlob.type.split("/")[1]}`
    );
    console.log(file);
    handleNewRecord(file);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setIsRecording(true);

      recorder.addEventListener("dataavailable", (e) => {
        // Do something with the data
        setAudioChunks((prev) => [...prev, e.data]);
      });

      recorder.start();
      setDuration(0);
      intervalRef.current = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      clearInterval(intervalRef.current);
      setAudioChunks([]);
      setDuration(0);
      setIsRecording(false);
      setIsPaused(false);
      handleFilesUpload();
    }
  };

  const toggleRecording = () => {
    if (mediaRecorder) {
      switch (mediaRecorder.state) {
        case "recording":
          mediaRecorder.pause();
          clearInterval(intervalRef.current);
          setIsRecording(false);
          setIsPaused(true);
          break;

        case "paused":
          mediaRecorder.resume();
          intervalRef.current = setInterval(() => {
            setDuration((prevDuration) => prevDuration + 1);
          }, 1000);
          setIsPaused(false);
          setIsRecording(true);
      }
    }
  };

  useEffect(() => {
    if (audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setCurrentAudio(url);
    }
  }, [audioChunks]);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className={styles.audioRecorder}>
      {duration != 0 && (
        <div className={styles.timer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.5 47.5"
            id="circle"
            fill={isRecording ? "#dd2e44" : "#de707e"}
            style={{
              animation: !isRecording && "none",
            }}
          >
            <defs>
              <clipPath id="a">
                <path d="M0 38h38V0H0v38Z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
              <path d="M36 19c0-9.389-7.611-17-17-17S2 9.611 2 19s7.611 17 17 17 17-7.611 17-17"></path>
            </g>
          </svg>

          <h1
            style={{
              opacity: isRecording ? "1" : "0.7",
            }}
          >
            {formatDuration(duration)}
          </h1>
        </div>
      )}
      {!isRecording & !isPaused & (duration === 0) ? (
        <div onClick={startRecording} className={styles.record}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.5 47.5"
            id="circle"
          >
            <defs>
              <clipPath id="a">
                <path d="M0 38h38V0H0v38Z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
              <path d="M36 19c0-9.389-7.611-17-17-17S2 9.611 2 19s7.611 17 17 17 17-7.611 17-17"></path>
            </g>
          </svg>
          <p>Iniciar grabación</p>
        </div>
      ) : (
        <div className={styles.controls}>
          <div onClick={toggleRecording} className={styles.control}>
            {!isRecording & isPaused ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="play"
                >
                  <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path>
                </svg>
                <p>Continuar </p>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  id="pause"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"></path>
                </svg>
                <p>Pausar</p>
              </>
            )}
          </div>
          <div onClick={stopRecording} className={styles.control}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="stop"
            >
              <path d="M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"></path>
            </svg>
            <p>Detener</p>
          </div>
        </div>
      )}
      {currentAudio && <audio controls src={currentAudio} />}
    </div>
  );
}
