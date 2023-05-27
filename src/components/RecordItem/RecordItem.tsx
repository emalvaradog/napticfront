import { useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";

export function RecordItem({
  title,
  date,
  onClick,
  onDelete,
  id,
}: {
  title: string;
  date: string;
  id: string;
  onClick: () => void;
  onDelete: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const { selectedRecord } = useSelector((state: RootState) => state.records);
  const { currentScreen } = useSelector((state: RootState) => state.auth);

  return (
    <button
      className={`${styles.item} ${
        selectedRecord?.id === id &&
        // @ts-ignore
        currentScreen === WorkSpaceScreen.SelectedRecord
          ? styles.itemSelected
          : ""
      }`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="sound">
        <path d="M2 24.5c.82813 0 1.5-.67139 1.5-1.5V9c0-.82861-.67188-1.5-1.5-1.5S.5 8.17139.5 9v14C.5 23.82861 1.17188 24.5 2 24.5zM9.09961 28.40918V3.59082c0-.82861-.67188-1.5-1.5-1.5s-1.5.67139-1.5 1.5v24.81836c0 .82861.67188 1.5 1.5 1.5S9.09961 29.23779 9.09961 28.40918zM14.7002 23V9c0-.82861-.67188-1.5-1.5-1.5s-1.5.67139-1.5 1.5v14c0 .82861.67188 1.5 1.5 1.5S14.7002 23.82861 14.7002 23zM20.2998 28.40918V3.59082c0-.82861-.67188-1.5-1.5-1.5s-1.5.67139-1.5 1.5v24.81836c0 .82861.67188 1.5 1.5 1.5S20.2998 29.23779 20.2998 28.40918zM25.90039 23V9c0-.82861-.67188-1.5-1.5-1.5s-1.5.67139-1.5 1.5v14c0 .82861.67188 1.5 1.5 1.5S25.90039 23.82861 25.90039 23zM30 2.09082c-.82813 0-1.5.67139-1.5 1.5v24.81836c0 .82861.67188 1.5 1.5 1.5s1.5-.67139 1.5-1.5V3.59082C31.5 2.76221 30.82813 2.09082 30 2.09082z"></path>
      </svg>
      <div className={styles.itemData}>
        <p>{title}</p>
        <span>{date}</span>
      </div>
      <div className={styles.itemBtns}>
        <div className={styles.itemFocus} onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="delete"
          >
            <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
          </svg>
        </div>
      </div>
    </button>
  );
}
