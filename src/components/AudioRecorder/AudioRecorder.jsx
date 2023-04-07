import { useState } from "react";
import { AudioRecorderSF } from "../AudioRecorderSF/AudioRecorderSF";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingNewRecord } from "../../store/audioLogs/audioLogsThunks";

export function AudioRecorder() {
  const [title, setTitle] = useState("Título grabación");
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  function handleNewRecord(audioFile) {
    const newLog = { title, audioFile };
    dispatch(startCreatingNewRecord(newLog));
  }

  function handleTitle(e) {
    const { value } = e.target;
    setTitle(value);
  }

  return (
    <section className={styles.section}>
      <textarea
        onChange={handleTitle}
        rows={1}
        wrap="soft"
        type="text"
        value={title}
      />
      <div className={styles.recorder}>
        <AudioRecorderSF handleNewRecord={handleNewRecord} />
      </div>
      <p>
        Siéntete con la libertad de pausar el audio cuando lo necesites. Una vez
        hayas terminado tu grabación, naptic automáticamente la guardará y
        podrás interactuar con ella
      </p>
    </section>
  );
}
