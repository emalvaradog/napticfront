import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const raleway = Raleway({ subsets: ["latin"] });

export default function Home() {
  const { uid } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (uid) router.push("/dashboard");
  }, [uid]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Naptic App - Chat with your data</title>
        <meta name="description" content="Naptic App - Chat with your data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/" className={styles.headerLogo}>
          <h1 className={raleway.className}>naptic</h1>
        </Link>
        <Link href="/login" className={styles.headerCTA}>
          Comenzar ahora
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1 className={`${raleway.className}`}>
            Naptic transforma tus <span>audios en conocimiento</span>
          </h1>
          <h3>
            La IA de Naptic transforma tus{" "}
            <span>reuniones, entrevistas o clases</span> en resúmenes precisos
            con los cuales podrás interactuar.
          </h3>
        </div>
        <div className={styles.demo}>
          <div className={styles.appSample}>
            <Image
              className={styles.sample}
              alt="Napticapp"
              src="/sample.png"
              fill={true}
            />
          </div>
          <a
            className={styles.cta}
            href="https://calendly.com/emanuelalvaradog/naptic"
            target="_blank"
            rel="noopener notererrer"
          >
            Agendar un demo
          </a>
        </div>
      </main>
    </div>
  );
}
