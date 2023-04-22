import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "@/store/store";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { setCurrentScreen } from "@/store/auth/authSlice";
import { WorkspaceHeader } from "../WorkspaceHeader/WorkspaceHeader";

export function MobileMenu() {
  const dispatch = useDispatch();
  const { currentScreen } = useSelector((state: RootState) => state.auth);

  function handleNewRecordScreen() {
    dispatch(setCurrentScreen(WorkSpaceScreen.Home));
  }

  function handleRecordListScreen() {
    dispatch(setCurrentScreen(WorkSpaceScreen.RecordsList));
  }

  return (
    <div className={styles.menu}>
      <div
        className={`${styles.menuItem} ${
          (currentScreen === WorkSpaceScreen.Home ||
            currentScreen === WorkSpaceScreen.Record ||
            currentScreen === WorkSpaceScreen.Upload) &&
          styles.menuItemActive
        }`}
        onClick={handleNewRecordScreen}
      >
        Nuevo registro
      </div>
      <div
        className={`${styles.menuItem} ${
          // @ts-ignore
          currentScreen === WorkSpaceScreen.RecordsList && styles.menuItemActive
        }`}
        onClick={handleRecordListScreen}
      >
        Mis registros
      </div>
    </div>
  );
}
