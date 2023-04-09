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
          <div className={styles.sectionButtons}>
            <button className={styles.selectFile} onClick={handleClick}>
              {files.length === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="upload-file"
                >
                  <path d="M12.71,11.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-2,2a1,1,0,0,0,1.42,1.42l.29-.3V17a1,1,0,0,0,2,0V14.41l.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.1,0A1.1,1.1,0,0,0,13.06,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="switch"
                >
                  <g data-name="circle switch">
                    <path d="M16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,16,25Z"></path>
                    <path d="M22.94 13.31a1 1 0 0 0 0-.25V13a.85.85 0 0 0-.06-.31 0 0 0 0 0 0 0h0a.85.85 0 0 0-.19-.3l0 0-3-3a1 1 0 0 0-1.42 1.42L19.59 12H16a1 1 0 0 0 0 2h3.59l-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 .19-.3A.3.3 0 0 0 22.94 13.31zM16 18H12.41l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0-.19.3.3.3 0 0 0 0 .1 1 1 0 0 0-.05.25V19a.85.85 0 0 0 .06.31 0 0 0 0 0 0 0h0a.85.85 0 0 0 .19.3l0 0 3 3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L12.41 20H16a1 1 0 0 0 0-2z"></path>
                  </g>
                </svg>
              )}
              <p>
                {files.length > 0
                  ? "Reemplazar archivo"
                  : "Seleccionar archivo"}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="upload-file"
                >
                  <path d="M12.71,11.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-2,2a1,1,0,0,0,1.42,1.42l.29-.3V17a1,1,0,0,0,2,0V14.41l.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.1,0A1.1,1.1,0,0,0,13.06,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Z"></path>
                </svg>
                Subir Audio
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
