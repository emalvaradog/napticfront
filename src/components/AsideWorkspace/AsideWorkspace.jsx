import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../store/auth/authSlice";
import { startUserLogout } from "../../store/auth/authThunks";
import { startSettingCurrentRecord } from "../../store/audioLogs/audioLogsThunks";

export function AsideWorkspace() {
  const dispatch = useDispatch();
  const { audioRecords } = useSelector((state) => state.records);

  const setHomeScreen = () => {
    dispatch(setCurrentScreen(0));
  };

  const handleLogOut = () => {
    dispatch(startUserLogout());
  };

  const handleButtonClick = (id) => {
    dispatch(startSettingCurrentRecord(id));
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.asideHeader}>
        <h1 onClick={setHomeScreen}>naptic</h1>
      </div>
      <div className={styles.asideLogs}>
        <h1>Tu historial de audios</h1>
        {audioRecords.length == 0 ? (
          <p>
            Actualmente no tienes ningún historial. Comienza una nueva grabación
            o sube un nuevo archivo para comenzar.
          </p>
        ) : (
          <div className={styles.asideLogsHistory}>
            {audioRecords.map((e) => (
              <button key={e.id} onClick={() => handleButtonClick(e.id)}>
                <p>{e.title}</p>
                <span>{e.creationDate}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.asideControls}>
        <div className={styles.asideControlsNewLog} onClick={setHomeScreen}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="plus">
            <path d="M72.5 46.5c0 2.5-2 4.5-4.5 4.5H50v17c0 2.5-2 4.5-4.5 4.5S41 70.5 41 68V51H24c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h17V24c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v18h18c2.5 0 4.5 2 4.5 4.5z"></path>
          </svg>
          <p>Nueva grabación</p>
        </div>
        <div className={styles.asideControlsLogout} onClick={handleLogOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="logout"
          >
            <g data-name="Layer 2">
              <g data-name="log-out">
                <rect opacity="0" transform="rotate(90 12 12)"></rect>
                <path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zM20.82 11.42l-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"></path>
              </g>
            </g>
          </svg>
          <p>Cerrar sesión</p>
        </div>
      </div>
    </aside>
  );
}
