import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export function AudioVisualizer({
  src,
  audioTime,
}: {
  src?: string;
  audioTime?: number;
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    audioRef.current.currentTime = audioTime;
  }, [audioTime]);

  return (
    <div className={styles.audio}>
      <audio src={src} controls ref={audioRef} />
    </div>
  );
}
