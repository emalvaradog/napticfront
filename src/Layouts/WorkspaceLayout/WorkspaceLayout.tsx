import { WorkspaceHeader } from "@/components";
import styles from "./styles.module.scss";
import { ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";

export function WorkspaceLayout({
  aside,
  mainContent,
}: {
  aside: () => ReactElement;
  mainContent: () => ReactElement;
}) {
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
