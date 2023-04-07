import { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

export function SelectedRecord() {
  const { selectedRecord } = useSelector((state) => state.records);
  const [textTimestamps, setTextTimestamps] = useState("");
  const [transcriptType, setTranscriptType] = useState(0);
  const [input, setInput] = useState("");

  const [chatContent, setChatContent] = useState([
    { role: "user", message: "hi there" },
    { role: "user", message: "hi there" },
    { role: "user", message: "hi there" },
    { role: "assistant", message: "hey" },
    { role: "user", message: "how can you help me today?" },
    {
      role: "assistant",
      message:
        "I can help you with any questions you have or provide information on various topics.",
    },
    { role: "user", message: "what's the weather like today?" },
    {
      role: "assistant",
      message:
        "I'm not able to provide real-time information, but you can check a weather website or app for the latest updates.",
    },
    { role: "assistant", message: "hey" },
    { role: "user", message: "how can you help me today?" },
    {
      role: "assistant",
      message:
        "I can help you with any questions you have or provide information on various topics.",
    },
    { role: "user", message: "what's the weather like today?" },
    {
      role: "assistant",
      message:
        "I'm not able to provide real-time information, but you can check a weather website or app for the latest updates.",
    },
    { role: "assistant", message: "hey" },
    { role: "user", message: "how can you help me today?" },
    {
      role: "assistant",
      message:
        "I can help you with any questions you have or provide information on various topics.",
    },
    { role: "user", message: "what's the weather like today?" },
    {
      role: "assistant",
      message:
        "I'm not able to provide real-time information, but you can check a weather website or app for the latest updates.",
    },
    { role: "user", message: "thank you!" },
    {
      role: "assistant",
      message:
        "You're welcome! If you have any more questions, feel free to ask.",
    },
  ]);

  function handleTranscriptionType(type) {
    setTranscriptType(type);
  }

  // Create function that copies text
  function copyTextToClipboard() {
    if (transcriptType === 0) {
      navigator.clipboard
        .writeText(selectedRecord.transcription.text)
        .then(() => {
          console.log("Text copied to clipboard:");
        })
        .catch((error) => {
          console.error("Error copying text to clipboard");
        });
    }
  }

  function handleInputChange({ target }) {
    const { value } = target;
    setInput(value);
  }

  useEffect(() => {
    let transcriptions = selectedRecord.transcription.timestamps.map(
      (section) => {
        `${section.start} - ${section.end} | ${section.text}`;
      }
    );
    setTextTimestamps(transcriptions);
    console.log(chatContent);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>
        <h1>{selectedRecord.title}</h1>
        <p>{selectedRecord.creationDate}</p>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContent}>
          <div className={styles.audio}>
            <audio controls src={selectedRecord.audios[0]} />
          </div>
          <div className={styles.transcript}>
            <div className={styles.transcriptHeader}>
              <p>Texto</p> <p onClick={copyTextToClipboard}>Copiar</p>
            </div>
            <div className={styles.transcriptText}>
              {transcriptType === 0 ? (
                <p>{selectedRecord.transcription.text}</p>
              ) : (
                textTimestamps.map((el) => {
                  <div>
                    <p>{el}</p>
                  </div>;
                })
              )}
            </div>
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.chatHeader}>Naptic bot</div>
          <div className={styles.chatContent}>
            <div className={styles.chatConversation}>
              {chatContent.length == 0 ? (
                <p>
                  Pregúntale cualquier cosa a naptic relacionada al audio o
                  transcripción
                </p>
              ) : (
                chatContent.map((el) => (
                  <div className={styles.message} key={el.message}>
                    <p>{el.role}</p>
                    <p>{el.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className={styles.chatInput}>
              <input value={input} onChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
