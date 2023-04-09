import { ChangeEvent, createRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingNewRecord } from "../../store/audioLogs/audioLogsThunks";
import { RootState } from "@/store/store";
import { Loader } from "@/components";

export function UploadFileView() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = createRef<HTMLInputElement>();
  const { audiosStatus } = useSelector((state: RootState) => state.records);
  const dispatch = useDispatch();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArr = Array.from(files);
      setFiles(fileArr);
    }
  };

  const handleClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleFilesUpload = () => {
    // TODO: Implement multiple file upload
    // @ts-ignore
    dispatch(startCreatingNewRecord({ audioFile: files[0] }));
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <section className={styles.section}>
      {audiosStatus === "loading" || audiosStatus === "error" ? (
        <Loader status={audiosStatus} />
      ) : (
        <>
          <div className={styles.sectionText}>
            <h1>Selecciona y sube el archivo de audio que quieres procesar</h1>
            <p>
              Al subir tu archivo naptic te generará una transcripción de texto
              automáticamente y podrás interactuar con tu audio haciéndole
              preguntas
            </p>
          </div>
          {files.length > 0 && (
            <div className={styles.files}>
              <p>
                {files.length === 1 && `${files.length} archivo seleccionado:`}
              </p>
              {files.map((e, index) => (
                <span key={e.name}>{e.name}</span>
              ))}
            </div>
          )}
          <button className={styles.selectFile} onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="upload"
            >
              <path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Z"></path>
            </svg>
            <p>
              {files.length > 0 ? "Reemplazar archivo" : "Seleccionar archivo"}
            </p>
          </button>
          <input
            type="file"
            accept="audio/m4a, audio/mp3, audio/webm, audio/wav, audio/mpeg, audio/mpga"
            multiple={false}
            onChange={onFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {files.length > 0 && (
            <button onClick={handleFilesUpload} disabled={files.length == 0}>
              Subir Audio
            </button>
          )}
        </>
      )}
    </section>
  );
}
