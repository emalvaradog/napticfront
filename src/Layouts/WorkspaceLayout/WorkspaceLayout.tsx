import { WorkspaceHeader } from "@/components";
import styles from "./styles.module.scss";
import { ReactElement, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { WorkSpaceScreen } from "@/interfaces/WorkSpaceInterfaces";
import { setCurrentScreen } from "@/store/auth/authSlice";

export function WorkspaceLayout({
  aside,
  mainContent,
}: {
  aside: () => ReactElement;
  mainContent: () => ReactElement;
}) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { currentScreen } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (currentScreen === WorkSpaceScreen.RecordsList && windowSize > 640) {
      dispatch(setCurrentScreen(WorkSpaceScreen.Home));
    }
  }, [windowSize]);

  return (
    <main className={styles.layout}>
      <Toaster />
      <header className={styles.layoutHeader}>
        <WorkspaceHeader />
      </header>
      <aside className={styles.layoutSidebar}>{aside()}</aside>
      <section className={styles.layoutContent}>{mainContent()}</section>
      <footer className={styles.layoutMenu}>
        <MobileMenu />
      </footer>
    </main>
  );
}
