import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../store/auth/authSlice";
import { startUserLogout } from "../../store/auth/authThunks";
import {
  startDeletingRecord,
  startRetrievingRecords,
  startSettingCurrentRecord,
} from "../../store/audioLogs/audioLogsThunks";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { Record } from "@/interfaces/Record";
import { RecordItem } from "../RecordItem/RecordItem";
import { useAuthUser } from "next-firebase-auth";

export function AsideWorkspace() {
  const dispatch = useDispatch();
  const { audioRecords } = useSelector((state: RootState) => state.records);
  const [sortedRecords, setSortedRecords] = useState<Record[]>([]);

  const authUser = useAuthUser();

  // Order records by creation date (newest first)
  useEffect(() => {
    if (audioRecords.length > 0) {
      const sorted = [...audioRecords].sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      );
      setSortedRecords(sorted);
    }
  }, [audioRecords]);

  // When component mounts, retrieve records from database
  useEffect(() => {
    // @ts-ignore
    dispatch(startRetrievingRecords(authUser.id));
  }, []);

  // Function to set current screen to Home
  const setHomeScreen = () => {
    dispatch(setCurrentScreen(WorkSpaceScreen.Home));
  };

  // Function to format date to dd mmm yyyy
  const formatDate = (date: string) => {
    const dateArr = date.split(" ");
    const dateFormatted = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
    return dateFormatted;
  };

  // Function to handle record button click
  const handleButtonClick = (id: string) => {
    // @ts-ignore
    dispatch(startSettingCurrentRecord(id));
  };

  // Function to handle delete record button click
  const handleOnDelete = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    // @ts-ignore
    dispatch(startDeletingRecord(id));
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.asideLogs}>
        <h1>Historial de audios</h1>
        {audioRecords.length == 0 ? (
          <p>
            Actualmente no tienes ningún historial. Comienza una nueva grabación
            o sube un nuevo archivo para comenzar.
          </p>
        ) : (
          <div className={styles.asideLogsHistory}>
            {sortedRecords.map((log) => (
              <RecordItem
                key={log.id}
                id={log.id}
                onClick={() => handleButtonClick(log.id)}
                title={log.title}
                date={formatDate(log.creationDate)}
                onDelete={(e) => handleOnDelete(e, log.id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.asideControls}>
        <div className={styles.asideControlsItem} onClick={setHomeScreen}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="plus">
            <path d="M72.5 46.5c0 2.5-2 4.5-4.5 4.5H50v17c0 2.5-2 4.5-4.5 4.5S41 70.5 41 68V51H24c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h17V24c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v18h18c2.5 0 4.5 2 4.5 4.5z"></path>
          </svg>
          <p>Nueva grabación</p>
        </div>
      </div>
    </aside>
  );
}
