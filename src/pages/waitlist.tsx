import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Waitlist.module.scss";

export default function Waitlist() {
  return (
    <div>
      <Head>
        <title>Naptic App - Chat with your data</title>
        <meta name="description" content="Naptic App - Chat with your data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/" className={styles.headerLogo}>
          <h1>naptic</h1>
        </Link>
        <Link href="/login" className={styles.headerCTA}>
          Comenzar ahora
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1>¡Reserva tu lugar!</h1>
          <h1>
            <span>Pronto serás parte de la revolución</span>
          </h1>
          <p>
            Estamos muy emocionados de compartir contigo nuestro próximo
            lanzamiento. ¡En estos momentos ya estás en la lista de espera!
            Estamos liberando acceso poco a poco. Pronto recibirás acceso a los
            nuevos features de naptic.
          </p>
        </div>
      </main>
    </div>
  );
}
