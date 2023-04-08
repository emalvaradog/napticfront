import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { setCurrentScreen } from "../../store/auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";

export function HomeWorkspace() {
  const dispatch = useDispatch();

  function handleScreen(screen: WorkSpaceScreen) {
    dispatch(setCurrentScreen(screen));
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionText}>
        <h1>¡Aquí comienza la magia!</h1>
        <p>
          Selecciona una conversación de tu historial o una opción para
          desbloquear el potencial de Naptic
        </p>
      </div>
      <div className={styles.sectionButtons}>
        <button onClick={() => handleScreen(WorkSpaceScreen.Record)}>
          Comenzar una grabación
        </button>
        <button onClick={() => handleScreen(WorkSpaceScreen.Upload)}>
          Subir archivos de audio
        </button>
      </div>
    </section>
  );
}
