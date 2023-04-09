import { useState } from "react";
import styles from "./styles.module.scss";

export function AudioVisualizer({ src }: { src?: string }) {
  return (
    <div className={styles.audio}>
      <audio src={src} controls />
    </div>
  );
}
