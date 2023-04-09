import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

export function Loader() {
  const { audiosStatus } = useSelector((state: RootState) => state.records);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (audiosStatus === "loading") {
      setStatus("Tu audio está siendo procesado");
    } else if (audiosStatus === "error") {
      setStatus("Ocurrió un error inesperado, intenta de nuevo");
    }
  }, [audiosStatus]);

  return (
    <div className={styles.loader}>
      <h1>Tu audio está siendo procesado</h1>
      <div className={styles.loaderSpinner}></div>
    </div>
  );
}
