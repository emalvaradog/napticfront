import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingNewRecord } from "../../store/audioLogs/audioLogsThunks";
import { RootState } from "@/store/store";
import { Loader } from "../../components/Loader/Loader";
import { AudioRecorder } from "@/components";
import { useAuthUser } from "next-firebase-auth";

export function AudioRecorderView() {
  const { audiosStatus } = useSelector((state: RootState) => state.records);
  const { id } = useAuthUser();
  const [title, setTitle] = useState("Título grabación");
  const dispatch = useDispatch();

  function handleNewRecord(audioFile: File) {
    const newLog = { title, audioFile, uid: id };
    // @ts-ignore
    dispatch(startCreatingNewRecord(newLog));
  }

  function handleTitle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setTitle(value);
  }

  return (
    <section className={styles.section}>
      {audiosStatus === "error" || audiosStatus === "loading" ? (
        <Loader status={audiosStatus} />
      ) : (
        <>
          <textarea onChange={handleTitle} rows={2} wrap="soft" value={title} />
          <div className={styles.recorder}>
            <AudioRecorder handleNewRecord={handleNewRecord} />
          </div>
          <p>
            Siéntete con la libertad de pausar el audio cuando lo necesites. Una
            vez hayas terminado tu grabación, naptic automáticamente la guardará
            y podrás interactuar con ella
          </p>
        </>
      )}
    </section>
  );
}
