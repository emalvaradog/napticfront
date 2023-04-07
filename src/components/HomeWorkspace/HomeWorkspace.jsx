import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { setCurrentScreen } from "../../store/auth/authSlice";

export function HomeWorkspace() {
  const dispatch = useDispatch();

  function handleScreen(e) {
    const { value } = e.target;
    dispatch(setCurrentScreen(parseInt(value)));
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
        <button value="1" onClick={handleScreen}>
          Comenzar una grabación
        </button>
        <button value="2" onClick={handleScreen}>
          Subir archivos de audio
        </button>
      </div>
    </section>
  );
}
