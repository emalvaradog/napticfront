import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { setCurrentScreen } from "@/store/auth/authSlice";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";

export function WorkspaceHeader() {
  const { name } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  function handleHome() {
    dispatch(setCurrentScreen(WorkSpaceScreen.Home));
  }

  return (
    <div className={styles.header}>
      <h1 onClick={handleHome}>naptic</h1>
      <p>{name}</p>
    </div>
  );
}
