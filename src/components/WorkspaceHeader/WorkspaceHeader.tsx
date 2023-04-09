import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

export function WorkspaceHeader() {
  const { name } = useSelector((state: RootState) => state.auth);
  return (
    <div className={styles.header}>
      <h1>naptic</h1>
      <p>{name}</p>
    </div>
  );
}
