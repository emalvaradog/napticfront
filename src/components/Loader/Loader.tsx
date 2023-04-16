import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

export function Loader({ status }: { status: string }) {
  const { audiosStatus } = useSelector((state: RootState) => state.records);

  return (
    <div className={styles.loader}>
      <h1>
        {status === "loading" || status === "!transcription"
          ? "Tu audio está siendo procesado"
          : "Ocurrió un error, inténtalo más tarde"}
      </h1>
      <div className={styles.loaderSpinner}></div>
    </div>
  );
}
